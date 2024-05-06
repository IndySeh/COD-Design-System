import { html } from 'lit-html';
import '../components/organisms/TableV2/cod-table-v2';

export default {
  title: 'Components/Organisms/TableV2',
};

export const Basic = () => html`
  <cod-table-v2 id="basicTable">
    <table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </cod-table>
`;

export const StackedInline = () => html`
  <cod-table-v2 data-id="table-stacked" table-stacked>
    <table>
      <thead>
        <tr>
          <th scope="col">Bus Route</th>
          <th scope="col">Route Viewer</th>
          <th scope="col">Downloadable Schedule</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Bus Route">
            1 Vernor
          </td>
          <td data-label="Route Viewer">
            <a href="https://example.com">View Route</a>
          </td>
          <td data-label="Downloadable Schedule">
            <a href="https://example.com">Download Schedule</a>
          </td>
        </tr>
        <tr>
          <td data-label="Bus Route">
            <ul>
              <li>2.1 Michigan</li>
              <li>2.2 Ohio</li>
              <li>2.3 Indiana</li>
              <li>2.4 Illinois</li>
            </ul>
          </td>
          <td data-label="Route Viewer">
            <a href="https://example.com">View Route</a>
          </td>
          <td data-label="Downloadable Schedule">
            <a href="https://example.com">Download Schedule</a>
          </td>
        </tr>
        <tr>
          <td data-label="Bus Route">
            3 Gratiot
          </td>
          <td data-label="Route Viewer">
            <a href="https://example.com">View Route</a>
          </td>
          <td data-label="Downloadable Schedule">
            <a href="https://example.com">Download Schedule</a>
          </td>
        </tr>
      </tbody>
    </table>
  </cod-table>
`;
