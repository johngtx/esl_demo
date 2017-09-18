Simple FreeSWITCH ESL application

# mod_xml_curl

## 一. 启用mod_xml_curl<br>
```
conf/autoload_configs/modules.conf.xml

<load module="mod_xml_curl"/>
```
## 二. 修改mod_xml_curl配置<br>
```
conf/autoload_configs/xml_curl.conf.xml

<configuration name="xml_curl.conf" description="cURL XML Gateway">
    <bindings>
        <binding name="dialplan">
            <param name="gateway-url" value="http://localhost:40096/fsapi/dialplan" bindings="dialplan"/> 
            <param name="METHOD" value="GET"/>
        </binding>
        <binding name="directory"> 
            <param name="gateway-url" value="http://localhost:40096/fsapi/directory" bindings="directory"/> 
            <param name="METHOD" value="GET"/>
        </binding> 
        <binding name="configuration"> 
            <param name="gateway-url"  value="http://localhost:40096/fsapi/configuration" bindings="configuration"/> 
            <param name="METHOD" value="GET"/>
        </binding>
    </bindings> 
</configuration>
```
## 三. 接口 <br>
    1. Directory: GET /fsapi/directory <br>
    2. Dialplan: GET /fsapi/dialplan <br>
    3. Configuration: GET /fsapi/configuration <br>