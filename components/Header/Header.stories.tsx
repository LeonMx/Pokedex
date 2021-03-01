import { Story, Meta } from '@storybook/react/types-6-0'
import Header from '.'

export default {
  title: 'UI/Header',
  component: Header,
} as Meta

const Template: Story = (args) => <Header {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Header',
}
