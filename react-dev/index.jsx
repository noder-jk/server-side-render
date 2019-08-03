import React, {Component} from 'react';
import Spinner from 'react-svg-spinner';
import Swal from 'sweetalert2';

import {ajaxRequest} from 'nodereactor/react';

class SettingPage extends Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {
            'ss_regex':'bot|crawler|spider|crawling|facebookexternalhit',
            'loading':false
        }

        this.saveOption=this.saveOption.bind(this);

        this.setVal=this.setVal.bind(this);
    }

    setVal(e)
    {
        let el=e.currentTarget;
        let v=el.value;

        this.setState({'ss_regex':v});
    }

    saveOption()
    {
        let vals=
        {
            'ss_regex':this.state.ss_regex
        };
        
        this.setState({'loading':true});

        ajaxRequest('nr_save_ss_render_settings', vals, (r,d,e)=>
        {
            this.setState({'loading':false});
            Swal.fire(!e ? 'Saved' : 'Error');
        });
    }

    componentDidMount()
    {
        this.setState({'loading':true});

        ajaxRequest('nr_get_ss_options', (r, d, e)=>
        {
            this.setState({'loading':false});

            if(e)
            {
                Swal.fire('Error', 'Request Failed', 'error');
                return;
            }

            if(r.ss_regex)
            {
                this.setState({'ss_regex':r.ss_regex});

                this.rg_txt.value=r.ss_regex;
            }
        });
    }

    render()
    {
        let txt_css=
        {
            'whiteSpace': 'nowrap',
            'overflow': 'auto',
            'minHeight':'150px'
        }

        return <div>
            <h3>Server Side Render {this.state.loading ? <Spinner size="15"/> : null}</h3>
            <hr/>
            
            <div className="row">
                <div className="col-12 col-sm-4 col-md-3 col-lg-2">
                    User Agent JS Regex<br/>
                    <small>Case insensitive by default.</small>
                </div> 
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <textarea style={txt_css} ref={el=>this.rg_txt=el} className="form-control" defaultValue={this.state.ss_regex} onChange={this.setVal}></textarea>
                    <small>Separate by new line. Without delimiter.</small>

                    <br/>
                    <button className="btn btn-secondary btn-sm" onClick={this.saveOption}>Save</button>
                </div> 
            </div>
        </div>
    }
}

export {SettingPage}