import fs from 'fs'
import os from 'os'
import path from 'path'

const LEVEL_ONE_ACTIVITIES: string[] = [
    '01-1 People',
    '01-2 Animals',
    '01-3 Pronouns',
    '01-4 Commands',
    '02-1 Common Items',
    '02-2 Kitchen Items',
    '02-3 Bedroom Items',
    '02-4 Office Items',
    '02-5 Living Room Items',
    '02-6 Bathroom Items',
    '02-7 People and Actions',
    '03-1 Parts of a House',
    '03-2 Common Room in a House',
    '04-1 Placement words',
    '04-2 Actions Related to Items',
    '05-1 Putting, Moving and Taking',
    '05-2 Outside',
    '06-1 Containers',
    '06-2 Carry, Pick up and Give',
    '06-3 Carrying, Picking up and Giving',
    '07-1 Body Parts',
    '07-2 Animal Body Parts',
    '08-1 Body Parts of others',
    '08-2 People and Body Positions',
    '09-1 My Family',
    '09-2 My Extended Family',
    '09-3 Looking and Seeing Commands',
    '09-4 Looking and Seeing',
    '10-1 Another\'s Family',
    '10-2 Another\'s Extended Family',
    '10-3 Touching Commands',
    '10-4 Touching',
    '11-1 Body Parts and Kinship',
    '12-1 Colors',
    '12-2 Adjective Pair Opposites',
    '13-1 throw, show, take, bring, give',
    '13-2 throwing, showing, taking, bringing, giving',
    '13-3 Drinking and Pouring Commands',
    '13-4 Drinking and Eating',
    '14-1 Food Items',
    '14-2 Eating and Feeding Commands',
    '14-3 Eating and Drinking',
    '14-4 Tools',
    '14-5 Commands Involving Tools',
    '14-5 Actions Involving Tools',
    '15-1 Possession and Ownership',
    '15-2 Plural',
    '15-3 Numbers 1 - 10',
    '16-1 Days of the week',
    '16-2 Relative Days',
    '16-3 Times of Day',
    '16-4 Seasons',
    '16-5 Months',
    '16-6 Sky and Weather',
    '16-7 Sky and Weather Adjectives',
    '17-1 Emotions',
    '17-2 Clothes',
    '17-3 Colors, Numbers, and Adjective Pair Opposites',
    '18-1 Animal Behaviors',
    '18-2 Bugs and Creeping Things',
    '18-3 Combine Known Objects with Emotional States of Individuals With Commands',
    '18-3 Combine Known Objects with Emotional States of Individuals',
    '19-1 What Insects Do',
    '19-2 What Insects are Doing',
    '19-3 Waterways and Landscapes',
    '19-4 Color and Number with Commands',
    '20-1 Ordinal Numbers',
    '20-2 Clock Times',
    '20-3 Terms for Wanting',
    '20-4 Terms for Needing',
    '21-1 Produce',
    '21-2 Streets',
    '22-1 Occupations',
    '22-2 Buildings and Locations',
    '23-1 Thinking Commands',
    '23-2 Thinking',
    '24-1 Thoughts Through Commands',
    '24-2 Thoughts',
    '25-1 More Commands',
    '25-2 More Adjectives Pair Opposites',
    '25-3 More Actions',
    '25-4 More Actions with Adjectives',
    '26-1 Fire',
    '27-1 Cooking Over a Fire',
    '03-1 Steps of Building Something',
    '31-1 Sewing',
    '32-1 Activities Related to Washing and Cleaning',
    '33-1 Another Activity Related to Washing and Cleaning',
    '35-1 Food Gathering',
    '38-1 Gardening',
    '39-1 More Gardening',
    '40-1 More Gardening',
    '43-1 Who, What, When, Where',
    '44-1 Questions Related to Fire and Cooking',
    '45-1 Questions Related to House Activities',
    '46-1 Questions Related to Making an Object',
    '47-1 Questions Related to Washing and Cleaning',
    '48-1 Questions Related to Buying and Selling',
    '49-1 Questions Related to Foraging, Hunting, or Fishing',
    '50-1 Questions Related to Gardening'
]
const mkImagesDir = (activityPath: string) => fs.promises.mkdir(path.join(activityPath, 'images'))
const mkStatementsDir = (activityPath: string) => fs.promises.mkdir(path.join(activityPath, 'statements'))
const mkTestDir = (activityPath: string) => fs.promises.mkdir(path.join(activityPath, 'test'))
const mkActivityDir = (levelPath: string, activityName: string) => {
    const activityPath = path.join(levelPath, activityName)
    return fs.promises.mkdir(activityPath).then(() => Promise.all([
        mkImagesDir(activityPath),
        mkStatementsDir(activityPath),
        mkTestDir(activityPath)
    ]))
}
const mkActivityDirs = (levelPath: string, activities: string[]) => Promise.all(activities.map(activityName => mkActivityDir(levelPath, activityName)))
const mkLevel1Dir = (libraryPath: string) => {
    const levelOnePath = path.join(libraryPath, 'Level 1')
    return fs.promises.mkdir(levelOnePath).then(() => mkActivityDirs(levelOnePath, LEVEL_ONE_ACTIVITIES))
}
export const mkLibrary = (libraryName: string) => {
    const libraryPath = path.join(os.homedir(), 'Pie', libraryName)
    return fs.promises.mkdir(libraryPath).then(() => Promise.all([ mkLevel1Dir(libraryPath)  ]))
}
