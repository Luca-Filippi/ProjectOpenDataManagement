const express = require("express");
const db = require("./db.js");
const router = express.Router();
const hash = require("./hash.js");
const jwt = require("./jwt.js");
const cookieParser = require("cookie-parser");
const { exitCode } = require("process");
const { isUndefined } = require("util");
const fs = require("fs");

let token = null;

checkRequestBody = function(req) {
    if(req.body.name === null || req.body.surname === null || req.body.username === null || req.body.password === null) {
        throw Error("dati null");
    }
    if(req.body.name === undefined || req.body.surname === undefined || req.body.username === undefined || req.body.password === undefined) {
        throw Error("dati undefined");
    }
}

checkData = function(req) {
    if(req.body.HomeTeam === null || req.body.AwayTeam === null || req.body.MatchDate === null || req.body.Time === null
        || req.body.Competition === null || req.body.Used === null || req.body.Type === null || req.body.Season == null) {
        throw Error("dati null");
    }
    if(req.body.HomeTeam === undefined || req.body.AwayTeam === undefined || req.body.MatchDate === undefined || req.body.Time === undefined
        || req.body.Competition === undefined || req.body.Used === undefined || req.body.Type === undefined || 
        req.body.Season === undefined || req.body.Description === undefined) {
        throw Error("dati undefined");
    }
}

updateFiles = async function(mongo) {
    fs.unlink("public/json/Team.json", function(errore) {
        if(errore) console.log("[server] il file Team.json non esiste");
    });
    fs.unlink("public/json/Match.json", function(errore) {
        if(errore) console.log("[server] il file Match.json non esiste");
    });
    fs.unlink("public/json/VarCheck.json", function(errore) {
        if(errore) console.log("[server] il file VarCheck.json non esiste");
    });
    fs.unlink("public/json/Metadata.json", function(errore) {
        if(errore) console.log("[server] il file Metadata.json non esiste");
    });
    const options = {
        mode: 0o600,
    }
    const Teams = await mongo.collection("Team").find().toArray();
    const Matches = await mongo.collection("Match").find().toArray();
    const VarChecks = await mongo.collection("VarCheck").find().toArray();
    const Metadata = await mongo.collection("Metadata").find().toArray();
    let data = "[ \n"
    for(let i = 0; i < Teams.length; i++) {
        data = data + "{\n"+ "\"TeamId\" : \"" + Teams[i].TeamId +"\",\n"
        +"\"Name\" : \"" + Teams[i].Name +"\",\n"
        +"\"League\" : \"" + Teams[i].League + "\"\n}\n"
        if(i < Teams.length - 1) {
            data = data + ",\n";
        }
    }
    data = data + "]"
    fs.writeFile("public/json/Team.json", data, options, (errore) => {
        if ( errore ) {
            console.log(errore);
        }
        console.log('[server] Team.json creato correttamente');
    });
    data = "[ \n"
    for(let i = 0; i < Matches.length; i++) {
        data = data + "{\n"+ "\"MatchId\" : \"" + Matches[i].MatchId +"\",\n"
        +"\"HomeTeam\" : \"" + Matches[i].HomeTeam +"\",\n"
        +"\"AwayTeam\" : \"" + Matches[i].AwayTeam +"\",\n"
        +"\"MatchDate\" : \"" + Matches[i].MatchDate +"\",\n"
        +"\"Competition\" : \"" + Matches[i].Competition +"\",\n"
        +"\"Season\" : \"" + Matches[i].Season + "\"\n}\n"
        if(i < Matches.length - 1) {
            data = data + ",\n";
        }
    }
    data = data + "]"
    fs.writeFile("public/json/Match.json", data, options, (errore) => {
        if ( errore ) {
            console.log(errore);
        }
        console.log('[server] Match.json creato correttamente');
    });
    data = "[ \n"
    for(let i = 0; i < VarChecks.length; i++) {
        data = data + "{\n"+ "\"VarCheckId\" : \"" + VarChecks[i].VarCheckId +"\",\n"
        +"\"Match\" : \"" + VarChecks[i].Match +"\",\n"
        +"\"Time\" : \"" + VarChecks[i].Time +"\",\n"
        +"\"InvolvedTeam\" : \"" + VarChecks[i].InvolvedTeam +"\",\n"
        +"\"Description\" : \"" + VarChecks[i].Description +"\",\n"
        +"\"Used\" : \"" + VarChecks[i].Used +"\",\n"
        +"\"Type\" : \"" + VarChecks[i].Type + "\"\n}\n"
        if(i < VarChecks.length - 1) {
            data = data + ",\n";
        }
    }
    data = data + "]"
    fs.writeFile("public/json/VarCheck.json", data, options, (errore) => {
        if ( errore ) {
            console.log(errore);
        }
        console.log('[server] VarCheck.json creato correttamente');
    });
    data = "[ \n"
    for(let i = 0; i < Metadata.length; i++) {
        data = data + "{\n"+ "\"Identifier\" : \"" + Metadata[i].Identifier +"\",\n"
        +"\"Contributor\" : \"" + Metadata[i].Contributor +"\",\n"
        +"\"Coverage\" : \"" + Metadata[i].Coverage +"\",\n"
        +"\"Creator\" : \"" + Metadata[i].Creator +"\",\n"
        +"\"Date\" : \"" + Metadata[i].Date +"\",\n"
        +"\"Description\" : \"" + Metadata[i].Description +"\",\n"
        +"\"Format\" : \"" + Metadata[i].Format +"\",\n"
        +"\"Language\" : \"" + Metadata[i].Language +"\",\n"
        +"\"Publisher\" : \"" + Metadata[i].Publisher +"\",\n"
        +"\"Relation\" : \"" + Metadata[i].Relation +"\",\n"
        +"\"Rights\" : \"" + Metadata[i].Rights +"\",\n"
        +"\"Source\" : \"" + Metadata[i].Source +"\",\n"
        +"\"Subject\" : \"" + Metadata[i].Subject +"\",\n"
        +"\"Title\" : \"" + Metadata[i].Title +"\",\n"
        +"\"Type\" : \"" + Metadata[i].Type + "\"\n}\n"
        if(i < Metadata.length - 1) {
            data = data + ",\n";
        }
    }
    data = data + "]"
    fs.writeFile("public/json/Metadata.json", data, options, (errore) => {
        if ( errore ) {
            console.log(errore);
        }
        console.log('[server] Metadata.json creato correttamente');
    });
}

router.post("/auth/signin", async(req,res) => {
    try{
        const mongo = db.getDb();
        const username = req.body.username;
        const password = req.body.password;
        const user = await mongo.collection("Users").findOne({'username' : username });
        if(user !== null && user !== undefined && hash.verifyPassword(password,user.password)) {
            token = jwt.setToken(username);
            console.log("[server] login effettuato da " + username);
            let payload = jwt.getPayload(token);
            res.cookie("token", token, {httpOnly:true});
            res.status(200).json({token: token, payload: payload});
        } else {
            res.status(404).json({'messaggio': "username o password errati"});
            console.log("[server] Username o password errati")
        }
    } catch(errore) {
        res.status(500).json({"messaggio": "Errore in /auth/signin"});
        console.error("[server] error post -> /auth/signin " + errore);
    }
});

router.post("/application/adduser", async (req,res) => {
    try{
        const mongo = db.getDb();
            checkRequestBody(req);
            let users = await mongo.collection("Users").find({'username' : req.body.username}).toArray();
            const user = await mongo.collection("Users").insertOne({'name' : req.body.name,
                'surname': req.body.surname, 'birthDate': req.body.birthDate, 'username':req.body.username,
                'password': hash.hashPassword(req.body.password)});
            console.log("[server] Aggiunto il nuovo utente " + req.body.username);
            res.status(200).json(user);
    } catch(errore) {
        res.status(500).json({"messaggio": "Errore in /application/adduser"});
        console.error("[server] errore post -> /apllication/adduser " + errore);
    }
});

router.get("/application/data", async (req, res) => {
    try{
        const mongo = db.getDb();
        updateFiles(mongo)
        let varChecks = await mongo.collection("VarCheck").find().toArray();
        let data = [];
        for(let varCheck of varChecks) {
            let match = await mongo.collection("Match").findOne({"MatchId" : varCheck.Match});
            data.push({"VarCheckId" : varCheck.VarCheckId, "HomeTeam" : match.HomeTeam, "AwayTeam" : match.AwayTeam,
             "MatchDate": match.MatchDate, "Time" : varCheck.Time, "Description" : varCheck.Description, "InvolvedTeam" : varCheck.InvolvedTeam,
              "Competition" : match.Competition, "Season" : match.Season ,"Used": varCheck.Used, "Type" : varCheck.Type})
        }
        if(data.length === 0) {
            throw new Error("data è vuoto");
        } else {
            res.status(200).json(data);
            console.log("[server] dati caricati");
        }
    } catch(errore) {
        res.status(500).json({"messaggio": "Errore in /application/data"});
        console.error("[server] errore get -> /application/data " + errore);
    }
});

router.post("/application/insertdata", async (req, res) => {
    try{
        const mongo = db.getDb();
        //let payload = jwt.getPayload(token);
        let payload = await mongo.collection("Users").findOne({"username" : "luca-filippi"});
        let user = await mongo.collection("Users").findOne({'username': payload.username});
        if(user !== null && user !== undefined) {
            checkData(req)
            let homeTeam = req.body.HomeTeam;
            let awayTeam = req.body.AwayTeam;
            let matchDate = req.body.MatchDate;
            let time = req.body.Time;
            let description = req.body.Description;
            let competition = req.body.Competition;
            let season = req.body.Season;
            let used = req.body.Used;
            let type = req.body.Type;
            let involvedTeam;
            if(req.body.InvolvedTeam === "A") {
                involvedTeam = awayTeam;
            } else if (req.body.InvolvedTeam === "H") {
                involvedTeam = homeTeam;
            } else {
                throw new Error("involvedTeam non valido")
            }
            let t = await mongo.collection("Team").findOne({"Name" : homeTeam});
            if(t === null) {
                let teamId = await mongo.collection("Team").count() + 1;
                await mongo.collection("Team").insertOne({"TeamId" : "T"+teamId, "Name": homeTeam, "League" : competition});
                let newMetaDataId = await mongo.collection("Metadata").count() + 1;
                await mongo.collection("Metadata").insertOne({"Identifier" : "M"+newMetaDataId, "Contributor" : user.username,
                    "Coverage" : "Trieste Italy 2023", "Creator" : user.username, "Date" : Date(), "Description" : "This metadata describes the"+
                    " information related to the team "+ "T" + teamId, "Format" : ".json", "Language" : "Enghlish/Italian",
                    "Publisher" : "Luca Filippi", "Relation" : "T" + teamId, "Rights" : "Unknown", "Source": "this application",
                    "Subject" : "Metadata del team T" + teamId, "Title" : "MD-T"+ teamId, "Type": "TeamData"});
                console.log("[server] Team e metadato inseriti");
            }
            t = await mongo.collection("Team").findOne({"Name" : awayTeam});
            if(t === null) {
                let teamId = await mongo.collection("Team").count() + 1;
                await mongo.collection("Team").insertOne({"TeamId" : "T"+teamId, "Name": awayTeam, "League" : competition});
                let newMetaDataId = await mongo.collection("Metadata").count() + 1;
                await mongo.collection("Metadata").insertOne({"Identifier" : "M"+newMetaDataId, "Contributor" : user.username,
                    "Coverage" : "Trieste Italy 2023", "Creator" : user.username, "Date" : Date(), "Description" : "This metadata describes the"+
                    " information related to the team "+ "T" + teamId, "Format" : ".json", "Language" : "Enghlish/Italian",
                    "Publisher" : "Luca Filippi", "Relation" : "T" + teamId, "Rights" : "Unknown", "Source": "this application",
                    "Subject" : "Metadata del team T" + teamId, "Title" : "MD-T"+ teamId, "Type": "TeamData"});
                console.log("[server] Team e metadato inseriti");
            }
            let m = await mongo.collection("Match").findOne({"HomeTeam" : homeTeam, "AwayTeam" : awayTeam, "matchDate" : matchDate,
                    "Competition": competition, "Season" : season});
            if(m === null) {
                let matchId = await mongo.collection("Match").count() + 1;
                m = await mongo.collection("Match").insertOne({"MatchId" : "M"+matchId, "HomeTeam" : homeTeam, "AwayTeam" : awayTeam
                , "matchDate" : matchDate, "Competition": competition, "Season" : season});
                let newMetaDataId = await mongo.collection("Metadata").count() + 1;
                await mongo.collection("Metadata").insertOne({"Identifier" : "M"+newMetaDataId, "Contributor" : user.username,
                     "Coverage" : "Trieste Italy 2023", "Creator" : user.username, "Date" : Date(), "Description" : "This metadata describes the"+
                     " information related to the match "+ "M" + matchId, "Format" : ".json", "Language" : "Enghlish/Italian",
                     "Publisher" : "Luca Filippi", "Relation" : "M" + matchId, "Rights" : "Unknown", "Source": "this application",
                     "Subject" : "Metadata del match M" + matchId, "Title" : "MD-M"+ matchId, "Type": "MatchData"});
                console.log("[server] Match e metadato inseriti");
            }
            let newVarCheckId = await mongo.collection("VarCheck").count() + 1;
            let newVarCheck = await mongo.collection("VarCheck").insertOne({"VarCheckId" : "VC"+newVarCheckId, "Match" : m.MatchId,
                                "Time" : time, "Description" : description, "InvolvedTeam" : involvedTeam, "Used" : used, "Type" : type});
            let newMetaDataId = await mongo.collection("Metadata").count() + 1;
            await mongo.collection("Metadata").insertOne({"Identifier" : "M"+newMetaDataId, "Contributor" : user.username,
                "Coverage" : "Trieste Italy 2023", "Creator" : user.username, "Date" : Date(), "Description" : "This metadata describes the"+
                " information related to the varcheck "+ "VC" + newVarCheckId, "Format" : ".json", "Language" : "Enghlish/Italian",
                "Publisher" : "Luca Filippi", "Relation" : "VC" + newVarCheckId, "Rights" : "Unknown", "Source": "this application",
                "Subject" : "Metadata del var check VC" + newVarCheckId, "Title" : "MD-VC"+ newVarCheckId, "Type": "VarCheckData"});
            console.log("[server] Varcheck  e metadato inseriti");
            res.status(200).json(newVarCheck);
        } else {
            res.status(401).json({"messaggio" : "Non sei loggato"});
            console.log("[server] il client non è loggato");
        }
    } catch(errore) {
        res.status(500).json({"messaggio": "Errore in /application/data/:VarCheckId"});
        console.error("[server] errore post -> /application/data " + errore);
    }
});

router.delete("/application/deletedata/:VarCheckId", async (req, res) => {
    try {
        const mongo = db.getDb();
        //let payload = jwt.getPayload(token);
        let payload = await mongo.collection("Users").findOne({"username" : "luca-filippi"});
        let user = await mongo.collection("Users").findOne({'username': payload.username});
        if(user !== null && user !== undefined) {
            let varCheck = await mongo.collection("VarCheck").findOne({"VarCheckId" : req.params.VarCheckId});
            if(varCheck !== null && varCheck !== undefined) {
                let metadata = await mongo.collection("Metadata").findOne({"Relation" : req.params.VarCheckId});
                if(metadata !== null && metadata !== undefined) {
                    await mongo.collection("Metadata").deleteOne(metadata);
                }
                await mongo.collection("VarCheck").deleteOne(varCheck);
                res.json(varCheck);
                console.log("[server] eliminato il varcheck con id: " + varCheck.VarCheckId);
            } else {
                res.status(404).json({"messaggio" : "il varcheck inserito non esiste"});
                console.log("[server] non ho trovato questo varCheck");
            }
        } else {
            res.status(401).json({"messaggio" : "Non sei loggato"});
            console.log("[server] il client non è loggato");
        }
    } catch(errore) {
        res.status(500).json({"messaggio": "Errore in /application/data/:VarCheckId"});
        console.error("[server] errore delete -> /application/data/:VarCheckId " + errore);
    }
    
});

module.exports = router;