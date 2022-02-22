# Live demo

[click here](https://guillaumeader1.github.io/wordle/)

### set default node version using nvm
create a `.nvmrc` file with the version 
```
v14.17.3
```
install `direnv`  https://direnv.net/docs/installation.html 

add `eval "$(direnv hook zsh)"` to `~/.zshrc`

create `.envrc` and add the following
```bash
nvmrc=~/.nvm/nvm.sh
if [ -e $nvmrc ]; then
  source $nvmrc
  nvm use
fi

PATH_add node_modules/.bin
```
allow direnv `direnv allow .`
close and reopen terminal

