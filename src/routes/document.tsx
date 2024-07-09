import { createFileRoute } from '@tanstack/react-router'
import Document from '../pages/document'
import { Helmet } from 'react-helmet'

export const Route = createFileRoute('/document')({
    component: () =>
        <>
            <Document />
            <Helmet>
                <title>Messages</title>
            </Helmet>
        </>
})