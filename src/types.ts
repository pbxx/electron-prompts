// export type uuid = RegExp = ''

export interface PromptManagerOptions {
	width?: number
	baseHeight?: number
	resizable?: boolean
	promptFile?: string
    devMode?: boolean
	logLevel?: number
	devLogLevel?: number
}

export interface OptionsElement {
	value: string
	text?: string
	selected?: boolean
}
/**
 * FormElement interface
 */
export interface formElement {
	name?: string
	placeholder?: string
	value?: string
	attributes?: Record<string, any>
	options?: Array<OptionsElement>
	classes?: Array<string>
}

export interface buttonElement {
	name: string
	value?: string
	classes?: Array<string>
}
export interface cancelButtonElement {
	value?: string
	classes?: Array<string>
}

/**
 * ### PromptTemplate interface
 */
export interface PromptTemplate {
	uuid?: string
	devMode?: boolean
	windowTitle?: string
	cancelButton?: cancelButtonElement
	elements?: Array<formElement>
	buttons?: Array<buttonElement>
}

export interface PromptResult {
	button: string
	values: Record<string, any>
}
