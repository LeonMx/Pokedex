import { Story, Meta } from '@storybook/react/types-6-0'
import Button from '.'

export default {
  title: 'UI/Button',
  component: Button,
} as Meta

const Template: Story = (args) => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Button' }
