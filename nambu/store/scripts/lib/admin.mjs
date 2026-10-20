// API de administración de una tienda a través de `shopify store execute` (pide `shopify store auth` antes).
import { spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const run = args => new Promise((resolve, reject) => {
	const child = spawn('shopify', args, { stdio: ['ignore', 'ignore', 'pipe'], shell: process.platform === 'win32' })
	let stderr = ''
	child.stderr.on('data', (chunk) => {
		stderr += chunk
	})
	child.on('close', code => code === 0 ? resolve() : reject(new Error(stderr.trim() || `shopify ${args[0]} terminó con ${code}`)))
})

export const createAdmin = (domain) => {
	const graphql = async (query, variables = {}) => {
		const dir = mkdtempSync(join(tmpdir(), 'nambu-admin-'))
		try {
			const files = { query: join(dir, 'query.graphql'), variables: join(dir, 'variables.json'), output: join(dir, 'output.json') }
			writeFileSync(files.query, query)
			writeFileSync(files.variables, JSON.stringify(variables))
			const mutation = /^\s*mutation\b/.test(query)
			await run(['store', 'execute', '-s', domain, '--query-file', files.query, '--variable-file', files.variables, '--output-file', files.output, '--no-input', ...(mutation ? ['--allow-mutations'] : [])])
			const result = JSON.parse(readFileSync(files.output, 'utf8'))
			if (result.errors?.length) throw new Error(result.errors.map(error => error.message).join('\n'))
			return result.data ?? result
		} finally {
			rmSync(dir, { recursive: true, force: true })
		}
	}

	// Falla con el detalle si alguna mutación devolvió userErrors
	const assertNoUserErrors = (data) => {
		const errors = Object.entries(data).flatMap(([alias, payload]) => (payload?.userErrors ?? []).map(error => `${alias}: ${error.field?.join('.') ?? ''} ${error.message}`))
		if (errors.length) throw new Error(errors.join('\n'))
		return data
	}

	return { graphql, mutate: async (query, variables) => assertNoUserErrors(await graphql(query, variables)) }
}
