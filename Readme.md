dotnet watch run
dotnet --info
dotnet restore
dotnet new classlib -o Core
dotnet sln add Core
API> dotnet add reference ../Infrastructure


dotnet ef database drop -p Infrastructure -s API
dotnet ef migrations remove -p Infrastructure -s API
dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations