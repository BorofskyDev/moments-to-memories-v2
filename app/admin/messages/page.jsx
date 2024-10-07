import SectionHeading from "@/components/headings/section-heading/SectionHeading";
import SectionContainer from "@/components/layout/containers/section-container/SectionContainer";
import MessageList from "@/components/pages/admin/messages/message-list/MessageList";


function MessagesPage() {
  return (
    <SectionContainer>
        <SectionHeading>Messages</SectionHeading>
    <MessageList />
    </SectionContainer>
  )
}
export default MessagesPage