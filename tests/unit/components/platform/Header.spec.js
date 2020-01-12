import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/platform/Header.vue'

describe('Header.vue', () => {
  it('Validate Header', () => {
    const title = 'strellus'
    const wrapper = shallowMount(Header, {
      propsData: { title },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.text()).toMatch(title)
  })
})
