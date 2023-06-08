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
        <span align="center">
 <a href="https://www.npmjs.com/package/@apitrakr/cli" target="_blank">
      <img src="https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=flat" alt="PR welcome on @apitrakr/cli" /> </a>
    </span>
     </div>
 
     
    
</div>

<br/>


# APITrakr
The main repo for APITrakr, an Open Source API testing framework.

# Building the project

The APITraktr project has been configured using Lerna framework which allows to manage multiple projects in the same repo (monorepo).

The build the project use the following command in the root folder of the project:

```
lerna run tsc
```

## Testing the CLI

To the the CLI locally, just run one of the following NPM scripts which will launch the CLI with chart and table output respectively.

### Chart output
```
npm run dev:run-cli-chart 
```

### Table output

```
npm run dev:run-cli-table 
```




