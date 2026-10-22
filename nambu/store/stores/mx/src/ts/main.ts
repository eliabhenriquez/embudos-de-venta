// Punto de entrada del tema: registra los web components
import { CarouselRail } from './carousel-rail'
import { CartDrawer } from './cart-drawer'
import { CartPage } from './cart-page'
import { CollectionSort } from './collection-sort'
import { KitStage } from './kit-stage'
import { NeedFinder } from './need-finder'
import { ProductForm } from './product-form'
import { ProductRecommendations } from './product-recommendations'
import { QuantityInput } from './quantity-input'
import { SiteHeader } from './site-header'
import { StickyBuy } from './sticky-buy'
import { VariantSelect } from './variant-select'

const ELEMENTS: Record<string, CustomElementConstructor> = {
	'carousel-rail': CarouselRail,
	'cart-drawer': CartDrawer,
	'cart-page': CartPage,
	'collection-sort': CollectionSort,
	'kit-stage': KitStage,
	'need-finder': NeedFinder,
	'product-form': ProductForm,
	'product-recommendations': ProductRecommendations,
	'quantity-input': QuantityInput,
	'site-header': SiteHeader,
	'sticky-buy': StickyBuy,
	'variant-select': VariantSelect
}

Object.entries(ELEMENTS).forEach(([name, element]) => {
	if (!customElements.get(name)) customElements.define(name, element)
})
