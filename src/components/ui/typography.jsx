

const H1 = ({ children, className, ...props }) => {

    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`} {...props} >
            {children}
        </h1>
    )
}

const H2 = ({ children, className, ...props }) => {
    return (
        <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`} {...props} >
            {children}
        </h2>
    )
}

const H3 = ({ children, className, ...props }) => {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`} {...props} >
            {children}
        </h3>
    )
}

const H4 = ({ children, className, ...props }) => {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`} {...props} >
            {children}
        </h4>
    )
}

const P = ({ children, className, ...props }) => {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`} {...props} >
            {children}
        </p>
    )
}

const Blockquote = ({ children, className, ...props }) => {
    return (
        <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`} {...props} >
            {children}
        </blockquote>
    )
}

const Lead = ({ children, className, ...props }) => {
    return (
        <p className={`text-xl text-muted-foreground ${className}`} {...props} >
            {children}
        </p>
    )
}

const Large = ({ children, className, ...props }) => {
    return (
        <div className={`text-lg font-semibold ${className}`} {...props} >{children}</div>
    )
}

const Small = ({ children, className, ...props }) => {
    return (
        <small className={`text-sm font-medium leading-none ${className}`} {...props} >{children}</small>
    )
}

const Muted = ({ children, className, ...props }) => {
    return (
        <p className={`text-sm text-muted-foreground ${className}`} {...props} >{children}</p>
    )
}

export { H1, H2, H3, H4, P, Blockquote, Lead, Large, Small, Muted }