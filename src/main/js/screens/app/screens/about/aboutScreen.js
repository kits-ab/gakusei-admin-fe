/* global frontend_global_data */

import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

export default class aboutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backend_licenses: '',
            frontend_licenses: '',
            license_url: {
                MIT: 'https://opensource.org/licenses/mit-license.php',
                'BSD-3-Clause': 'https://opensource.org/licenses/BSD-3-Clause',
                LGPL: 'https://opensource.org/licenses/LGPL-2.1'
            }
        };
        // debugger;
    }

    render() {
        return (
            <div>
            <Grid>
            <Row>
            <Col xs={12}>
            <div className="text-left">
            <h2>Om Gakusei</h2>
        <p>
        Gakusei är en webbapplikation där du kan öva dig på japanska.
            Applikationen har följande tre spellägen:
            </p>
        <ol>
        <li>
        &quot;Gissa ordet&quot; som kan hittas under fliken &quot;Glosor&quot;.
        Här ska man välja rätt översättning på ett ord bland fyra alternativ.
        </li>
        <li>
        &quot;Översätt ordet&quot; som även det kan hittas under fliken &quot;Glosor&quot;.
        Här gäller det att skriva in rätt översättning på ett ord.
        </li>
        <li>
        &quot;Quiz&quot; och där man kan spela frågesporter kopplade till Japan.
        </li>
        </ol>
        <p>Utvecklingen av applikationen sker i form av ett open source-projekt och sponsras utav <a target="_blank" rel="noopener noreferrer" href="https://www.kits.se">Kits</a>.
        Besök gärna projektets <a target="_blank" rel="noopener noreferrer" href="https://github.com/kits-ab/gakusei/">Githubsida.</a>
            </p>
            <p> Webbappen Gakusei går under licensen <a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        </div>
        </Col>
        </Row>
        </Grid>
        </div>
    );
    }
}
