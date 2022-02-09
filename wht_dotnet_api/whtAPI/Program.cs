using whtAPI.Data.Interfaces;
using whtAPI.Data.Providers;
using whtAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddSingleton<IDataProvider, SqlDataProvider>(delegate (IServiceProvider provider)
{
    return new SqlDataProvider(connectionString);
}
);
builder.Services.AddSingleton<IRecapService, RecapService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("whtCORS",
                      builder =>
                      {
                          builder
                         .AllowAnyHeader()
                         .WithMethods("Get", "Post")
                         .AllowCredentials()
                         .WithOrigins("http://localhost:3000", "https://whathappenstoday.com")
                         .Build();

                      });
});



builder.Services.AddControllersWithViews();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});

var app = builder.Build();

app.UseCors("whtCORS");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSpa(spa =>
 {
     spa.Options.SourcePath = "ClientApp";
 });

app.UseAuthorization();


app.Run();
