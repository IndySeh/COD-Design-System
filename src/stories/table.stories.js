import { html } from 'lit-html';
import '../components/atoms/TableHeader/cod-table-header';
import '../components/atoms/TableBody/cod-table-body';
import '../components/atoms/TableRow/cod-table-row';
import '../components/atoms/TableCell/cod-table-cell';
import '../components/atoms/TableCellHeader/cod-table-cell-header';
import '../components/organisms/Table/cod-table';

export default {
  title: 'Components/Organisms/Table',
};

export const Basic = () => html`
  <cod-table data-id="basicTable">
    <table class="table no-wc">
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
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const StripedRows = () => html`
  <cod-table data-id="striped-row" data-striped-row="true">
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const StripedColumns = () => html`
  <cod-table data-id="striped-col" data-striped-col="true">
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const Hover = () => html`
  <cod-table data-id="table-hover" data-hover="true">
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const Dark = () => html`
  <cod-table
    data-id="table-dark"
    data-hover="true"
    data-extra-classes="table-dark"
  >
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const Custom = () => html`
  <cod-table
    data-id="table-custom-1"
    data-hover="true"
    data-extra-classes="bg-success"
  >
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>

  <cod-table
    data-id="table-custom-2"
    data-hover="true"
    data-extra-classes="bg-warning"
  >
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">First</cod-table-cell-header>
        <cod-table-cell-header scope="col">Last</cod-table-cell-header>
        <cod-table-cell-header scope="col">Handle</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Mark</cod-table-cell>
        <cod-table-cell>Otto</cod-table-cell>
        <cod-table-cell>@mdo</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Jacob</cod-table-cell>
        <cod-table-cell>Thornton</cod-table-cell>
        <cod-table-cell>@fat</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell colspan="2">Larry the Bird</cod-table-cell>
        <cod-table-cell>@twitter</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const Scrollable = () => html`
  <cod-table data-id="table-scrollable" data-scrollable="true">
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">#</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
        <cod-table-cell-header scope="col">Table heading</cod-table-cell-header>
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell scope="row">1</cod-table-cell>
        <cod-table-cell>Table cell 1</cod-table-cell>
        <cod-table-cell>Table cell 2</cod-table-cell>
        <cod-table-cell>Table cell 3</cod-table-cell>
        <cod-table-cell>Table cell 4</cod-table-cell>
        <cod-table-cell>Table cell 5</cod-table-cell>
        <cod-table-cell>Table cell 6</cod-table-cell>
        <cod-table-cell>Table cell 7</cod-table-cell>
        <cod-table-cell>Table cell 8</cod-table-cell>
        <cod-table-cell>Table cell 9</cod-table-cell>
        <cod-table-cell>Table cell 10</cod-table-cell>
        <cod-table-cell>Table cell 11</cod-table-cell>
        <cod-table-cell>Table cell 12</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">2</cod-table-cell>
        <cod-table-cell>Table cell 1</cod-table-cell>
        <cod-table-cell>Table cell 2</cod-table-cell>
        <cod-table-cell>Table cell 3</cod-table-cell>
        <cod-table-cell>Table cell 4</cod-table-cell>
        <cod-table-cell>Table cell 5</cod-table-cell>
        <cod-table-cell>Table cell 6</cod-table-cell>
        <cod-table-cell>Table cell 7</cod-table-cell>
        <cod-table-cell>Table cell 8</cod-table-cell>
        <cod-table-cell>Table cell 9</cod-table-cell>
        <cod-table-cell>Table cell 10</cod-table-cell>
        <cod-table-cell>Table cell 11</cod-table-cell>
        <cod-table-cell>Table cell 12</cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell scope="row">3</cod-table-cell>
        <cod-table-cell>Table cell 1</cod-table-cell>
        <cod-table-cell>Table cell 2</cod-table-cell>
        <cod-table-cell>Table cell 3</cod-table-cell>
        <cod-table-cell>Table cell 4</cod-table-cell>
        <cod-table-cell>Table cell 5</cod-table-cell>
        <cod-table-cell>Table cell 6</cod-table-cell>
        <cod-table-cell>Table cell 7</cod-table-cell>
        <cod-table-cell>Table cell 8</cod-table-cell>
        <cod-table-cell>Table cell 9</cod-table-cell>
        <cod-table-cell>Table cell 10</cod-table-cell>
        <cod-table-cell>Table cell 11</cod-table-cell>
        <cod-table-cell>Table cell 12</cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const StackedBlock = () => html`
  <cod-table
    data-id="table-stacked"
    data-stacked="true"
    data-label-block="true"
  >
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">Bus Route</cod-table-cell-header>
        <cod-table-cell-header scope="col">Route Viewer</cod-table-cell-header>
        <cod-table-cell-header scope="col"
          >Downloadable Schedule</cod-table-cell-header
        >
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">1 Vernor</cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">2 Michigan</cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">3 Grand River</cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">4 Gunston</cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell>
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;

export const StackedInline = () => html`
  <cod-table data-id="table-stacked" data-stacked="true">
    <cod-table-header>
      <cod-table-row>
        <cod-table-cell-header scope="col">Bus Route</cod-table-cell-header>
        <cod-table-cell-header scope="col">Route Viewer</cod-table-cell-header>
        <cod-table-cell-header scope="col"
          >Downloadable Schedule</cod-table-cell-header
        >
      </cod-table-row>
    </cod-table-header>
    <cod-table-body>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">1 Vernor</cod-table-cell>
        <cod-table-cell data-label="Route Viewer">
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell data-label="Downloadable Schedule">
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">2 Michigan</cod-table-cell>
        <cod-table-cell data-label="Route Viewer">
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell data-label="Downloadable Schedule">
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">
          <ul>
            <li>This is one item</li>
            <li>This is another item</li>
            <li>This is another item</li>
            <li>This is another item</li>
          </ul>
        </cod-table-cell>
        <cod-table-cell data-label="Route Viewer">
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell data-label="Downloadable Schedule">
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
      <cod-table-row>
        <cod-table-cell data-label="Bus Route">4 Gunston</cod-table-cell>
        <cod-table-cell data-label="Route Viewer">
          <a href="https://example.com">View Route</a>
        </cod-table-cell>
        <cod-table-cell data-label="Downloadable Schedule">
          <a href="https://example.com">Download Schedule</a>
        </cod-table-cell>
      </cod-table-row>
    </cod-table-body>
  </cod-table>
`;
