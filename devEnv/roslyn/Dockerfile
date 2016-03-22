FROM microsoft/aspnet

RUN mkdir ./omnisharp-roslyn
RUN curl -sSL https://github.com/OmniSharp/omnisharp-roslyn/archive/v1.7.2.1.tar.gz | tar zxfv - -C ./omnisharp-roslyn --strip-components 1


ENV DNX_UNSTABLE_FEED=https://www.myget.org/F/aspnetcidev/api/v2
# RUN dnvm upgrade -u
#
# RUN sed -i -e 's|"$HOME/.dnx/runtimes/$RUNTIME/bin/dnx"|dnx|g' ./omnisharp-roslyn/scripts/Omnisharp
#
# WORKDIR /omnisharp-roslyn
# RUN dnu restore
