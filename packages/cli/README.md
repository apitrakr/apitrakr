
<div align="center">
     <img src="https://github.com/apitrakr/apitrakr/assets/905984/09047b1d-f10d-463a-ba50-214d16d42f5a" width=100 />
</div>
<div align="center">
    <h1 align="center">APITrakr</h1>
    <h5>API Testing Framework</h5>
</div>
<div align="center">
  <a href="https://apitrakr.com?ref=github">apitrakr.com</a>
</div>
<br/>

<div align="center">
 <a href="https://www.npmjs.com/package/@apitrakr/cli" target="_blank">
      <img src="https://img.shields.io/npm/v/@apitrakr/cli?label=npm&style=flat" alt="get @apitrakr/cli on npm">
    </a>
</div>

<br/>


# `@apitrakr/cli`

APITrakr is an API testing tool which makes testing your API endpoint extremely easy.
This CLI (Command Line Interface) allows to run your API tests from your terminal or CI/CD pipeline with ease.

## Getting started

To start using APITrakr, just install the NPM package and start using it!

#### Install from NPM

```bash
npm i @apitrakr/cli
```

#### Run the CLI

```bash
npx @apitrakr/cli -u "https://api.github.com/octocat" -n 10 -m GET -x parallel -s chart -t 2500
```

## More options

```
Options:
  -V, --version                output the version number
  -u, --url <value>            The URL of the request
  -m, --method <value>         The method of the request (GET, POST, HEAD, etc..)
  -s, --visualization <value>  Shows a visualization related to the current execution run. table, chart, text
  -n, --iterations <value>     The number of iterations
  -p, --payload <value>        The payload file path
  -e, --headers <value>        The headers file path
  -x, --execution <value>      The execution type (sequential or parallel)
  -t, --timeout <value>        Max timeout in ms
  -h, --help                   Show help
```

#### Output example


```
--------------------------------------------------------
-       APITrakr CLI - API testing tool                -
--------------------------------------------------------

   167.00┤ ╭╮
   162.80┤ ││
   158.60┤ ││
   154.40┤ ││
   150.20┤ ││                    ╭╮   ╭
   146.00┤ ││                  ╭╮││  ╭╯
   141.80┤ ││               ╭─╮│││╰──╯
   137.60┤ │╰╮        ╭─╮  ╭╯ ╰╯╰╯
   133.40┤╭╯ │ ╭╮╭╮   │ ╰╮ │
   129.20┼╯  │╭╯╰╯╰╮ ╭╯  │ │
   125.00┤   ╰╯    ╰─╯   ╰─╯


✅ 10 executions complete on:
https://api.github.com/octocat


✅ Execution stats
  ➡️  Median: 232.5 ms
  ➡️  Min: 228 ms
  ➡️  Max: 273 ms
  ➡️  StdDev: 13.24 ms


```