import { useStore } from "@nanostores/react"
import { TabSelector } from "./TabSelector"
import { Header } from "./application/Header"
import { $selectedTab } from "@/stores/TabStore"
import { Categories } from "./Categories"
import { RandomAd } from "./RandomAd"
import { Posts } from "./Posts"
import { loggedUser } from "@/stores/UserStore"
import { CreatePost } from "./application/NewPost"

export const Feed = () => {
  const tab = useStore($selectedTab);
  const currentUser = useStore(loggedUser);

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 p-4 text-white">
        <TabSelector />

        <section>
          {
            tab === 'posts' && currentUser && <CreatePost />
          }
        </section>

        <section>
          {
            tab === 'posts' && <Posts />
          }
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