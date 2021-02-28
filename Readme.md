dotnet watch run
dotnet --info
dotnet restore
dotnet new classlib -o Core
dotnet sln add Core
API> dotnet add reference ../Infrastructure
