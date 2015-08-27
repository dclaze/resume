function LinkedInToJsonResume() {}

LinkedInToJsonResume.prototype.process = function(profile) {
    var target = {};

    this._processBasics(profile, target);
    this._processWork(profile, target);
    this._processEducation(profile, target);
    this._processSkills(profile, target);
    this._processLanguages(profile, target);
    this._processReferences(profile, target);
    this._processVolunteer(profile, target);
    this._processAwards(profile, target);
    this._processProjects(profile, target);

    return target;
}

LinkedInToJsonResume.prototype._processBasics = function(source, target) {
    target.basics = {
        name: source.firstName + ' ' + source.lastName,
        label: source.headline,
        picture: source.pictureUrl,
        email: source.emailAddress,
        phone: source.phoneNumbers && source.phoneNumbers._total ? source.phoneNumbers.values[0].phoneNumber : '',
        website: '',
        summary: source.summary,
        location: {
            address: '',
            postalCode: '',
            city: source.location ? source.location.name : '',
            countryCode: source.location ? source.location.country.code.toUpperCase() : '',
            region: ''
        },
        profiles: []
    };
};

LinkedInToJsonResume.prototype._processWork = function(source, target) {
    function processPosition(position) {
        var object = {
            company: position.company.name,
            position: position.title || '',
            website: '',
            startDate: position.startDate.year + '-' + (position.startDate.month < 10 ? '0' : '') + position.startDate.month + '-01',
            summary: position.summary,
            highlights: []
        };

        if (position.endDate) {
            object.endDate = position.endDate.year + '-' + (position.endDate.month < 10 ? '0' : '') + position.endDate.month + '-01';
        }

        return object;
    }

    var work = source.positions && source.positions.values ? source.positions.values.map(processPosition) : [];

    target.work = work;
};

LinkedInToJsonResume.prototype._processEducation = function(source, target) {
    function processEducation(education) {
        var object = {
            institution: education.schoolName,
            area: education.fieldOfStudy,
            studyType: education.degree,
            startDate: '' + education.startDate.year + '-01-01',
            gpa: '',
            courses: []
        };

        if (education.endDate) {
            object.endDate = education.endDate.year + '-01-01';
        }

        return object;
    }

    var education = source.educations && source.educations.values ? source.educations.values.map(processEducation) : [];

    target.education = education;
};

LinkedInToJsonResume.prototype._processSkills = function(source, target) {
    var skills = source.skills && source.skills.values ? source.skills.values.map(function(skill) {
        return {
            name: skill.skill.name,
            level: '',
            keywords: []
        };
    }) : [];

    target.skills = skills;
};

LinkedInToJsonResume.prototype._processLanguages = function(source, target) {
    var languages = source.languages && source.languages.values ? source.languages.values.map(function(language) {
        return {
            language: language.language.name,
            fluency: ''
        };
    }) : [];

    target.languages = languages;
};

LinkedInToJsonResume.prototype._processReferences = function(source, target) {

    var references = source.recommendationsReceived && source.recommendationsReceived.values ? source.recommendationsReceived.values.map(function(reference) {
        return {
            name: reference.recommender.firstName + ' ' + reference.recommender.lastName,
            reference: reference.recommendationText
        };
    }) : [];

    target.references = references;
};

LinkedInToJsonResume.prototype._processVolunteer = function(source, target) {
    var volunteer = source.volunteer && source.volunteer.volunteerExperiences && source.volunteer.volunteerExperiences.values ? source.volunteer.volunteerExperiences.values.map(function(volunteer) {
        return {
            organization: volunteer.organization.name,
            position: volunteer.role
        };
    }) : [];

    target.volunteer = volunteer;
};

LinkedInToJsonResume.prototype._processAwards = function(source, target) {
    var awards = source.honorsAwards && source.honorsAwards.values ? source.honorsAwards.values.map(function(honorsAward) {
        return {
            awarder: honorsAward.issuer,
            title: honorsAward.name
        };
    }) : [];

    target.awards = awards;
};

LinkedInToJsonResume.prototype._processProjects = function(source, target) {
    var projects = source.projects && source.projects.values ? source.projects.values.map(function(project) {
        return {
            name: project.name,
            description: project.description
        };
    }) : [];

    target.projects = projects;
};
