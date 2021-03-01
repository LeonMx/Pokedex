import { Story, Meta } from '@storybook/react/types-6-0'
import Badge from '.'

export default {
  title: 'UI/Badge',
  component: Badge,
} as Meta

const Template: Story = (args) => <Badge {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Badge',
}
