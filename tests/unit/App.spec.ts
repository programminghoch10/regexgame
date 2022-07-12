import { mount, VueWrapper } from "@vue/test-utils";
import App from "@/App.vue";
import RegexBox from "@/components/RegexBox.vue";
import AnswerBox from "@/components/AnswerBox.vue";

describe("AppApp.vue", () => {
  const possibleAnswerBoxes = 3;
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(App);
  });
  test("App shows play button on start screen", () => {
    const startButton = wrapper.find("#start-game-button");
    expect(startButton.exists()).toBe(true);
  });
  test("When play button is pressed the game starts", async () => {
    const startButton = wrapper.find("#start-game-button");
    expect(startButton.exists()).toBe(true);

    startButton.trigger("click");

    await wrapper.vm.$nextTick();

    const answerBoxes = wrapper.findAllComponents(AnswerBox);
    expect(answerBoxes.length).toBe(possibleAnswerBoxes);

    const regexBox = wrapper.findComponent(RegexBox);
    expect(regexBox.exists()).toBe(true);
  });
});
