import Layout from "./components/layout"
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient()

function App({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {children}

      </Layout>
    </QueryClientProvider>
  )
}

export default App
