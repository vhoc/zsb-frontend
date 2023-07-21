import * as React from 'react';
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function Breadcrumb(props) {

    function handleClick(event) {
        event.preventDefault();
    }

    const history = useHistory()
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {props.links.map((e) => {
                    return (
                        <Link key={e.name} underline="hover" color="inherit" href="/" onClick={() => history.push(e.link)}>
                            {e.name}
                        </Link>)
                })}
                <Typography color="text.primary">{props.localTitle}</Typography>
            </Breadcrumbs>
        </div>
    );
}