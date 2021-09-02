import TreeIndex from './TreeIndex'
export default {
  title: 'Index',
  component: TreeIndex,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'secondary','red','black'],
      },
      defaultValue: 'primary'
    },
    text: {
      control: 'url',
      defaultValue: 'Awesome Button'
    }
  }
}

export const Index = (arg,{argTypes}) => ({
  components: {TreeIndex},
  props: Object.keys(argTypes),
  template: '<TreeIndex v-bind="$props" />'
})
