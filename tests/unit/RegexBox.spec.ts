import { mount, VueWrapper } from "@vue/test-utils";
import RegexBox from "@/components/RegexBox.vue";

describe("RegexBox.vue", () => {
  let wrapper: VueWrapper;
  let regexString: string;

  beforeEach(() => {
    regexString = "((.ba)*a)*";
    wrapper = mount(RegexBox, {
      props: {
        regExp: new RegExp(regexString),
      },
      global: {
        plugins: [],
      },
    });
  });
  test("RegexBox shows correct regex string", () => {
    expect(wrapper.html()).toContain(regexString);
  });
});
