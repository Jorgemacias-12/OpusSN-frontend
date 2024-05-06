import { useStore } from "@nanostores/react"
import { TabSelector } from "./TabSelector"
import { Header } from "./application/Header"
import { $selectedTab } from "@/stores/TabStore"
import { Categories } from "./Categories"
import { RandomAd } from "./RandomAd"
import { Posts } from "./Posts"

export const Feed = () => {
  const tab = useStore($selectedTab);

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 p-4 text-white">
        <TabSelector />

        
        <section>
          {
            tab === 'posts' && <Posts />
          }
        </section>
        
        <section>
          
        </section>

        {
          tab === 'categories' && (
            <>
              <Categories />
              <RandomAd />
            </>
          )
        }
      </main>
    </>
  )
}