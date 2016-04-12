FROM node

RUN npm install -g typescript ts-node yo tsserver-client ungit

RUN git clone git://github.com/c9/core.git cloud9 && \
		cd cloud9 && ./scripts/install-sdk.sh
    
RUN apt-get update && apt-get install -y \
    vim  \
    zsh  \
    tmux \
    mc   \
    htop

#Bash configuration    
ADD bash/bashrc /root/.bashrc

#Zsh configuration
ADD zsh/zshrc /root/.zshrc
ADD zsh/oh-my-zsh /root/.oh-my-zsh

#tmux configuration
ADD tmux/tmux.conf /root/.tmux.conf


#Vim configuration
ADD vim /root/.vim
ADD vim/vimrc /root/.vimrc