import { createFileRoute } from '@tanstack/react-router'
import Code from '../pages/code'
import { Helmet } from 'react-helmet'

export const Route = createFileRoute('/code/$id')({

    component: getCode
})

function getCode() {
  const { id } = Route.useParams();
  return <>
      <Code params={{id}}/>
      <Helmet>
          <title>Code</title>
      </Helmet>
    </>
}