import { Story, Meta } from '@storybook/react/types-6-0'
import Input from '.'

export default {
  title: 'UI/Input',
  component: Input,
} as Meta

const Template: Story = (args) => <Input {...args} />

export const Basic = Template.bind({})
Basic.args = { type: 'text' }
