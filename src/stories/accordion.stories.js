import { html } from 'lit-html';
import '../components/atoms/AccordionHeader/cod-accordion-header';
import '../components/atoms/AccordionBody/cod-accordion-body';
import '../components/atoms/AccordionItem/cod-accordion-item';
import '../components/molecules/Accordion/cod-accordion';

export default {
  title: 'Components/Molecules/Accordion',
};

export const Basic = () => html`
  <cod-accordion data-id="accordionExample">
    <div class="no-wc accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Accordion Item #1
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            Placeholder content for this accordion, which is intended to
            demonstrate the <code>.accordion-flush</code> class. This is the
            first item's accordion body.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Accordion Item #2
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            Placeholder content for this accordion, which is intended to
            demonstrate the <code>.accordion-flush</code> class. This is the
            second item's accordion body. Let's imagine this being filled with
            some actual content.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            Accordion Item #3
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            Placeholder content for this accordion, which is intended to
            demonstrate the <code>.accordion-flush</code> class. This is the
            third item's accordion body. Nothing more exciting happening here in
            terms of content, but just filling up the space to make it look, at
            least at first glance, a bit more representative of how this would
            look in a real-world application.
          </div>
        </div>
      </div>
    </div>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #1</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #2</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the second item's accordion body.</strong> It is
          hidden by default, until the collapse plugin adds the appropriate
          classes that we use to style each element. These classes control the
          overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML
          can go within the <code>.accordion-body</code>, though the transition
          does limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #3</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
  </cod-accordion>
`;

export const Flush = () => html`
  <cod-accordion data-id="accordionFlushExample" data-flush="true">
    <p class="no-wc">Testing default markup</p>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #1</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #2</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the second item's accordion body.</strong> It is
          hidden by default, until the collapse plugin adds the appropriate
          classes that we use to style each element. These classes control the
          overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML
          can go within the <code>.accordion-body</code>, though the transition
          does limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header>
        <span>Accordion Item #3</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
  </cod-accordion>
`;

export const List = () => html`
  <cod-accordion data-id="accordionListExample" data-ol="true">
    <cod-accordion-item>
      <cod-accordion-header>
        <h5 class="mb-0">Accordion Item</h5>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item data-li-bg="success" data-li-text="dark">
      <cod-accordion-header>
        <h5 class="mb-0">Accordion Item</h5>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the second item's accordion body.</strong> It is
          hidden by default, until the collapse plugin adds the appropriate
          classes that we use to style each element. These classes control the
          overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML
          can go within the <code>.accordion-body</code>, though the transition
          does limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item data-li-bg="warning" data-li-text="dark">
      <cod-accordion-header>
        <h5 class="mb-0">Accordion Item</h5>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
  </cod-accordion>
`;

export const Custom = () => html`
  <cod-accordion data-id="accordionFlushExample" data-flush="true">
    <cod-accordion-item>
      <cod-accordion-header data-extra-classes="bg-info text-light">
        <span>Accordion Item #1</span>
      </cod-accordion-header>
      <cod-accordion-body data-extra-classes="bg-success">
        <p>
          <strong>This is the first item's accordion body.</strong> It is shown
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header data-extra-classes="bg-warning text-dark">
        <span>Accordion Item #2</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the second item's accordion body.</strong> It is
          hidden by default, until the collapse plugin adds the appropriate
          classes that we use to style each element. These classes control the
          overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding
          our default variables. It's also worth noting that just about any HTML
          can go within the <code>.accordion-body</code>, though the transition
          does limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
    <cod-accordion-item>
      <cod-accordion-header data-extra-classes="bg-danger text-light">
        <span>Accordion Item #3</span>
      </cod-accordion-header>
      <cod-accordion-body>
        <p>
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, until the collapse plugin adds the appropriate classes
          that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You
          can modify any of this with custom CSS or overriding our default
          variables. It's also worth noting that just about any HTML can go
          within the <code>.accordion-body</code>, though the transition does
          limit overflow.
        </p>
      </cod-accordion-body>
    </cod-accordion-item>
  </cod-accordion>
`;
