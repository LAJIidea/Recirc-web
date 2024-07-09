import { createFileRoute } from '@tanstack/react-router'
import Discord from '../pages/discord'
import { Helmet } from 'react-helmet'

export const Route = createFileRoute('/discord')({
    component: () =>
        <>
            <Discord />
            <Helmet>
                <title>discord</title>
            </Helmet>
        </>
})