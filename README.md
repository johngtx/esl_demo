# Simple FreeSWITCH ESL application

## mod_xml_curl
FS使用该模块来动态获取 XML content, 代替conf/*下默认的静态配置文件

### 一. 启用mod_xml_curl
```
conf/autoload_configs/modules.conf.xml

<load module="mod_xml_curl"/>
```
### 二. 修改mod_xml_curl配置
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
### 三. 接口
    1. Directory:           # GET /fsapi/directory
    2. Dialplan:            # GET /fsapi/dialplan
    3. Configuration:       # GET /fsapi/configuration

## mod_json_cdr
FS使用该模块将话单信息发送到指定的接收服务器(mod_xml_cdr用法与该模块类似,只是数据格式为XML格式)
### 一. 启用mod_json_cdr
```
conf/autoload_configs/modules.conf.xml

<load module="mod_json_cdr"/>
```
### 二. 修改mod_json_cdr配置文件
```
<configuration name="json_cdr.conf" description="JSON CDR CURL logger">
  <settings>
    <!-- the url to post to if blank web posting is disabled  -->
    <!-- <param name="url" value="http://localhost/fscdr"/> -->

    <!-- optional: credentials to send to web server -->
    <!-- <param name="cred" value="user:pass"/> -->

    <!-- the total number of retries (not counting the first 'try') to post to webserver incase of failure -->
    <!-- <param name="retries" value="2"/> -->

    <!-- delay between retries in seconds, default is 5 seconds -->
    <!-- <param name="delay" value="1"/> -->

    <!-- Log via http and on disk, default is false -->
    <!-- <param name="log-http-and-disk" value="true"/> -->

    <!-- optional: if not present we do not log every record to disk -->
    <!-- either an absolute path, a relative path assuming ${prefix}/logs or a blank value will default to ${prefix}/logs/xml_cdr -->
    <param name="log-dir" value=""/>

    <!-- optional: if not present we do log the b leg -->
    <!-- true or false if we should create a cdr for the b leg of a call-->
    <param name="log-b-leg" value="false"/>
    
    <!-- optional: if not present, all filenames are the uuid of the call -->
    <!-- true or false if a leg files are prefixed "a_" -->
    <param name="prefix-a-leg" value="true"/>

    <!-- encode the post data may be 'true' for url encoding, 'false' for no encoding, 'base64' for base64 encoding or 'textxml' for text/xml -->
    <param name="encode" value="true"/>

    <!-- optional: set to true to disable Expect: 100-continue lighttpd requires this setting --> 
    <!--<param name="disable-100-continue" value="true"/>--> 
    
    <!-- optional: full path to the error log dir for failed web posts if not specified its the same as log-dir -->
    <!-- either an absolute path, a relative path assuming ${prefix}/logs or a blank or omitted value will default to ${prefix}/logs/xml_cdr -->
    <!-- <param name="err-log-dir" value="$${temp_dir}"/> -->

    <!-- which auhtentification scheme to use. Supported values are: basic, digest, NTLM, GSS-NEGOTIATE or "any" for automatic detection -->
    <!--<param name="auth-scheme" value="basic"/>--> 

    <!-- optional: this will enable the CA root certificate check by libcurl to
         verify that the certificate was issued by a major Certificate Authority.
         note: default value is disabled. only enable if you want this! -->
    <!--<param name="enable-cacert-check" value="true"/>-->
    <!-- optional: verify that the server is actually the one listed in the cert -->
    <!-- <param name="enable-ssl-verifyhost" value="true"/> -->

    <!-- optional: these options can be used to specify custom SSL certificates
         to use for HTTPS communications. Either use both options or neither.
         Specify your public key with 'ssl-cert-path' and the private key with
         'ssl-key-path'. If your private key has a password, specify it with
         'ssl-key-password'. -->
    <!-- <param name="ssl-cert-path" value="$${certs_dir}/public_key.pem"/> -->
    <!-- <param name="ssl-key-path" value="$${certs_dir}/private_key.pem"/> -->
    <!-- <param name="ssl-key-password" value="MyPrivateKeyPassword"/> -->

    <!-- optional: use a custom CA certificate in PEM format to verify the peer
         with. This is useful if you are acting as your own certificate authority.
         note: only makes sense if used in combination with "enable-cacert-check." -->
    <!-- <param name="ssl-cacert-file" value="$${certs_dir}/cacert.pem"/> -->

    <!-- optional: specify the SSL version to force HTTPS to use. Valid options are
         "SSLv3" and "TLSv1". Otherwise libcurl will auto-negotiate the version. -->
    <!-- <param name="ssl-version" value="TLSv1"/> -->

    <!-- optional: enables cookies and stores them in the specified file. -->
    <!-- <param name="cookie-file" value="$${run_dir}/mod_xml_cdr-cookie.txt"/> -->
  </settings>
</configuration>

```
### 三. 接口
    1. /fscdr           # POST    接收话单信息
    2. /fscdr/all       # GET     获取所有话单列表
### 四. 数据格式
    1. 话单数据(JSON)
```
{
    core_uuid:          string,     //FS uuid
    switchname:         string,     //FS name
    caller_id_name:     string,     //主叫名称
    caller_id_number:   string,     //主叫号码
    destination_numer:  string,     //目标号码
    context:            string,     //主叫CONTEXT
    start_stamp:        string,     //开始时间
    end_stamp:          string,     //结束时间
    duration:           string,     //持续时长
    billsec:            string,     //计费时长
    hangup_cause:       string,     //挂断原因
    uuid:               string,     //UUID
    bleg_uuid:          string,     //bleg uuid
    account_code:       string      //主叫账号
}
```