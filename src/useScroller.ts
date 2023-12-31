enum ScrollDirection {
    Up = 'up',
    Down = 'down'
}

export const useScroller = (menuHeight: number = 64) => {
    let lastScrollTop = 0

    function scrollTo(target: string): void {
        const anchor = document.querySelector(target)

        if (anchor) {
            const current = window.scrollY
            const offset = anchor.getBoundingClientRect().y <= 0 ? menuHeight : 0

            window.scrollTo({
                top: anchor.getBoundingClientRect().y + current - offset,
                behavior: 'smooth'
            })
        }
    }

    function scrollDirection(): ScrollDirection {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const direction = scrollTop > lastScrollTop ? ScrollDirection.Down : ScrollDirection.Up
        lastScrollTop = scrollTop
        return direction
    }

    function registerEvents(): void {
        document.querySelectorAll('[data-scroll]').forEach(element => {
            element.addEventListener('click', event => {
                const target = (element as HTMLLinkElement).dataset.scroll as string

                if (target && document.querySelector(target)) {
                    event.preventDefault()
                    scrollTo(target)
                }
            })
        })
    }

    return {
        scrollTo,
        scrollDirection,
        registerEvents
    }
}