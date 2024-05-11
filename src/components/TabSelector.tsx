import { $selectedTab } from "@/stores/TabStore"
import type { TabType } from "@/types";
import { useStore } from "@nanostores/react"

export const TabSelector = () => {

  const selectedTab = useStore($selectedTab);

  const setCategory = (value: string) => {
    $selectedTab.set(value as TabType);
  }

  return (
    <section className="bg-brand-blue-900 h-16 text-white flex items-center gap-2 justify-center rounded-lg w-full max-w-screen-xs mx-auto md:hidden">

      <button onClick={() => setCategory('posts')} className={`flex items-center gap-2 p-2 rounded-md transition-all ${selectedTab === 'posts' ? 'bg-brand-blue-700' : ''}`}>
        <span className="fas fa-users fa-xl"></span>
        Posts
      </button>

      <button onClick={() => setCategory('categories')} className={`flex items-center gap-2 p-2 rounded-md transition-all ${selectedTab === 'categories' ? 'bg-brand-blue-700' : ''}`}>
        <span className="fas fa-users fa-tag fa-xl"></span>
        Categorias
      </button>
    </section>
  )
}
