import { Story, Meta } from '@storybook/react/types-6-0'
import ProgressBar from '.'

export default {
  title: 'UI/ProgressBar',
  component: ProgressBar,
} as Meta

const Template: Story = (args) => <ProgressBar {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'ProgressBar',
  percentage: 25,
}
