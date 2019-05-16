import React, {Component} from 'react';
import Spinner from 'react-svg-spinner';
import Swal from 'sweetalert2';
import axios from 'axios';

import {ajax_url} from 'nodereactor/react';

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
            'action':'nr_save_ss_render_settings',
            'ss_regex':this.state.ss_regex
        };
        
        this.setState({'loading':true});

        axios({
            method:'post',
            url:ajax_url ,
            data:vals
        }).then(r=>
        {
            this.setState({'loading':false});
            Swal.fire('Saved');

        }).catch(r=>
        {
            this.setState({'loading':false});
            Swal.fire('Error', 'Request Failed', 'error');
        })
    }

    componentDidMount()
    {
        this.setState({'loading':true});

        axios({
            method:'post',
            url:ajax_url,
            data:{'action':'nr_get_ss_options'}
        }).then(r=>
        {
            this.setState({'loading':false});
        
        
            if(r.data && r.data.ss_regex)
            {
                this.setState({'ss_regex':r.data.ss_regex});
                this.rg_txt.value=r.data.ss_regex;
            }

        }).catch(r=>
        {
            this.setState({'loading':false});
            Swal.fire('Error', 'Request Failed', 'error');
        })
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