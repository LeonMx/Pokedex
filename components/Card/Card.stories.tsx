import { Story, Meta } from '@storybook/react/types-6-0'
import Card from '.'

export default {
  title: 'UI/Card',
  component: Card,
} as Meta

const Template: Story = (args) => <Card {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Card',
}
