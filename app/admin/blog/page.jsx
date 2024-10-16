import SectionContainer from "@/components/layout/containers/section-container/SectionContainer"
import UnderConstruction from "@/components/layout/under-construction/UnderConstruction"
import PostsList from "@/components/pages/admin/blog/admin-post-list/PostList"
import CreateNewBlogComponent from "@/components/pages/admin/blog/CreateNewBlogComponent"

function AdminBlogPage() {
  return (
    <SectionContainer>
      <CreateNewBlogComponent />
      <PostsList />

    </SectionContainer>
  )
}
export default AdminBlogPage