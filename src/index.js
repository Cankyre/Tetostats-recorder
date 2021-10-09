const { TetraChannel } = require("tetr.js")
const fs = require("fs")
const path = require("path")

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json")).toString())

function format_data(data) {
    console.log(data)
}

async function get_data(list, collected) {
    if (list.length == 0) {
        console.log(1)
        format_data(collected)
        return collected //TODO: does not return properly
    } else {
        let data;
        let options = list[0][2]
        Object.keys(options).forEach((i) => {
            if (options[i] == undefined) {
                delete options[i]
            }
        })
        if (list[0][0] == "tl") {
            data = await TetraChannel.leaderboards.tetra_league({
                country: list[0][1]?.toUpperCase() || "",
                ...options
            })
        } else if (list[0][0] == "tlf") {
            data = await TetraChannel.leaderboards.tetra_league_full(list[0][1]?.toUpperCase() || "")
        } else if (list[0][0] == "xp") {
            data = await TetraChannel.leaderboards.xp({
                country: list[0][1]?.toUpperCase() || "",
                ...options
            })
        } else {
            data = await TetraChannel.misc.stream(list[0][0])
        }
        setTimeout(() => get_data(list.slice(1), [...(collected || []), ...data]), 1030);
    }
}

function format_config() {
    let request_list = []
    config.data.leaderboards.forEach(id => {
        let lb, country, limit, before, after;
        lb = id.split(/[#&]/gi)[0]
        if (id.indexOf("#") + 1) {
            country = id.split("#")[1].split(/[#&]/gi)[0];
        }
        if (id.indexOf("&l") + 1) {
            limit = parseInt(id.split("&l")[1].split(/[#&]/gi)[0]);
        }
        if (id.indexOf("&b") + 1) {
            before = parseInt(id.split("&b")[1].split(/[#&]/gi)[0]);
        }
        if (id.indexOf("&a") + 1) {
            after = parseInt(id.split("&a")[1].split(/[#&]/gi)[0]);
        }
        request_list.push([lb, country, {limit, before, after}])
    })
    return request_list
}

async function main() {
    console.log(await get_data(format_config()))
}
main()