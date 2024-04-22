/**
 * A file to contain constants, helper funtions, and
 * anything else needed by multiple components.
 */

export const stackedTableClass = 'table-stacked';
export const cellHeaderBlockClass = 'cell-header-block';
export const firstClass = 'first';
export const oddClass = 'odd';

function handleTableStacked(currentHtmlElement, targetHtmlElement) {
  if (currentHtmlElement.getAttribute('data-stacked') !== null) {
    targetHtmlElement.setAttribute('data-stacked', '');
    currentHtmlElement.getAttribute('data-label-block') !== null
      ? targetHtmlElement.setAttribute('data-label-block', '')
      : 0;
  }
}

export { handleTableStacked };
