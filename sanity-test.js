const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'qdidf6e5',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false
});

async function run() {
    const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]');
    console.log("homePage:", home ? "Exits with sections: " + home.sections?.length : "NULL");

    const legacy = await client.fetch('*[_type == "mentoriaPackages"][0]');
    console.log("legacy Mentoria:", legacy ? "Exists" : "NULL");
}

run().catch(console.error);
