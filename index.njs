const check_referrer=function($)
{
    var resp=false;
    var agent=$._SERVER.HTTP_USER_AGENT || '';

    var opt=$.get_option('ss_regex', 'server-side-render');
    if(!opt || typeof opt!=='string')
    {
        opt='bot|crawler|spider|crawling|facebookexternalhit';
    }

    opt.split('\n').forEach(r=>
    {
        try
        {
            var rgx=new RegExp(r, 'gi');
            if(rgx.test(agent)==true)
            {
                resp=true;
            };
        }
        catch(e)
        {
        }
    });

    return resp;
}

const nr_create_admin_page=function($, next)
{
    var sub_page=
    {
        'page_title':'Server Side Render', 
        'menu_title':'SS Render', 
        'slug':'nr-server-side-render', 
        'component':'SettingPage', 
        'package':'server-side-render',
        'parent_slug':'settings'
    }

    $.add_submenu_page(sub_page);

    next($);
}

const nr_handle_ss_render=function($, next)
{
    if($._SERVER['REQUEST_METHOD']=='GET' && !$._GET.ss_render_virtual_request && !$.requested_file_path && check_referrer($)==true)
    {
        var cc=async ($) => 
        {
            /* Virtual Browser */
            var puppeteer = require('puppeteer');
            var browser = await puppeteer.launch({headless: true});

            /* Virtual Browser Configs */
            var  page = await browser.newPage();
            var  local_url = nr_home_url.slice(0, -1)+$.nr_pathname+'?ss_render_virtual_request=yes';

            /* Access the url */
            await page.goto(local_url, 
            {
                waitUntil: "networkidle0",
            });

            
            /* Collect the codes */
            var  html = await page.evaluate(() => 
            {
                return document.documentElement.innerHTML;
            }).catch(e=>
            {
                console.log('"Puppeteer" error under "push-notifier" package.');
                console.log(e);
            });

            /* Send to requester */
            $.exit(html);

            browser.close();
        }
        cc($); 
        return;
    }

    next($);
}

module.exports.run=function($, next)
{
    $.add_action('init', nr_handle_ss_render);

    $.add_action('admin_menu', nr_create_admin_page);

    next($);
}