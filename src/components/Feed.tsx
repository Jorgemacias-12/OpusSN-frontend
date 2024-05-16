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
      <main className="relative flex flex-col gap-5 p-4 text-white">
        <TabSelector />

        <section className="flex flex-col gap-10">
          {
            tab === 'posts' && currentUser && <CreatePost />
          }

          {
            tab === 'posts' && <Posts />
          }
        </section>

        <section className="p-2 rounded-md fixed right-0 hidden lg:flex w-60 mr-5 bg-brand-black-800 flex-col 2xl:right-56">
          <h4 className="text-center pt-5 text-2xl font-bold">Anuncios</h4>
          <RandomAd />
          <Categories />
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