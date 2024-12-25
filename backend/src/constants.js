export const LIFE_EVENTS = {
    PROFESSIONAL: {
        CAREER: {
            PROMOTION: {
                POSITIVE: [2, 6, 7, 10, 11], // Houses of growth, career, recognition
                NEGATIVE: [6, 8, 12] // Obstacles, sudden changes, losses
            },
            TRANSFER: {
                POSITIVE: [3, 9, 10], // Travel, change of environment, career
                NEGATIVE: [8, 12] // Sudden changes, hidden losses
            },
            JOB_CHANGE: {
                POSITIVE: [3, 6, 9, 10], // Effort, career, travel for opportunity
                NEGATIVE: [8, 12] // Disruption, hidden enemies, loss
            },
            RETIREMENT: {
                POSITIVE: [4, 10, 12], // Emotional stability, career, spirituality
                NEGATIVE: [6, 8] // Illness, obstacles
            },
            INTERNSHIP: {
                POSITIVE: [3, 5, 9, 10], // Effort, learning, opportunity
                NEGATIVE: [6, 8] // Struggles, challenges
            },
            NETWORKING: {
                POSITIVE: [3, 7, 11], // Communication, partnerships, social circles
                NEGATIVE: [12] // Isolation, hidden enemies
            },
            SKILL_DEVELOPMENT: {
                POSITIVE: [2, 5, 9, 11], // Learning, personal growth, gains
                NEGATIVE: [6] // Struggles
            },
            PERFORMANCE_REVIEW: {
                POSITIVE: [5, 6, 10], // Effort, career, achievements
                NEGATIVE: [8, 12] // Loss, enemies
            },
            TERMINATION: {
                POSITIVE: [6, 8], // Endings leading to new opportunities
                NEGATIVE: [12] // Loss, hidden problems
            }
        },
        EDUCATION: {
            PRIMARY: {
                POSITIVE: [4, 5, 9], // Emotional stability, learning, higher knowledge
                NEGATIVE: [6, 8] // Obstacles, sudden changes
            },
            SECONDARY: {
                POSITIVE: [3, 5, 9], // Effort, learning, higher knowledge
                NEGATIVE: [6, 8] // Struggles, obstacles
            },
            HIGHER_SECONDARY: {
                POSITIVE: [3, 5, 9, 11], // Higher knowledge, gains
                NEGATIVE: [6, 12] // Hidden enemies, struggles
            },
            UNDERGRADUATE: {
                POSITIVE: [5, 9, 11], // Learning, opportunity, gains
                NEGATIVE: [6, 8] // Struggles, sudden challenges
            },
            POSTGRADUATE: {
                POSITIVE: [9, 10, 11], // Higher learning, career, gains
                NEGATIVE: [6, 12] // Struggles, isolation
            },
            PHD: {
                POSITIVE: [5, 9, 11], // Research, gains, knowledge
                NEGATIVE: [6, 12] // Struggles, isolation
            },
            SCHOLARSHIP: {
                POSITIVE: [9, 11], // Gains, opportunities
                NEGATIVE: [6, 8] // Obstacles, sudden challenges
            },
            EXAM_SUCCESS: {
                POSITIVE: [3, 5, 6, 9], // Effort, success, learning
                NEGATIVE: [8, 12] // Hidden losses, failure
            },
            EXAM_FAILURE: {
                POSITIVE: [6], // Overcoming failure
                NEGATIVE: [8, 12] // Loss, obstacles
            },
            DROPOUT: {
                POSITIVE: [8], // Freedom from obstacles
                NEGATIVE: [12] // Loss, giving up
            },
            ADMISSION: {
                POSITIVE: [3, 5, 9, 11], // Opportunity, success
                NEGATIVE: [6, 12] // Obstacles, hidden losses
            },
            DEGREE_COMPLETION: {
                POSITIVE: [5, 9, 11], // Achievement, success, gains
                NEGATIVE: [6] // Obstacles
            },
            CERTIFICATION: {
                POSITIVE: [3, 5, 9], // Effort, learning, success
                NEGATIVE: [6] // Struggles
            },
            RESEARCH: {
                POSITIVE: [5, 9], // Learning, knowledge
                NEGATIVE: [12] // Isolation
            },
            ONLINE_COURSES: {
                POSITIVE: [3, 5, 9, 11], // Effort, opportunity, gains
                NEGATIVE: [6] // Obstacles
            },
            STUDY_ABROAD: {
                POSITIVE: [9, 12], // Travel, opportunity, higher learning
                NEGATIVE: [6] // Obstacles
            }
        }
    },

    HEALTH: {
        ILLNESS: {
            DIAGNOSIS: {
                POSITIVE: [6, 8], // Diagnosis leading to treatment
                NEGATIVE: [12] // Hidden illness
            },
            RECOVERY: {
                POSITIVE: [6, 11], // Health improvement
                NEGATIVE: [8] // Continuing struggles
            },
            SURGERY: {
                POSITIVE: [6, 8], // Recovery through surgery
                NEGATIVE: [12] // Hidden complications
            },
            CHRONIC_CONDITION: {
                POSITIVE: [6, 11], // Management
                NEGATIVE: [8] // Continuous struggle
            },
            PREVENTIVE_CARE: {
                POSITIVE: [6, 8], // Health maintenance
                NEGATIVE: [12] // Neglect leading to hidden problems
            },
            MENTAL_HEALTH: {
                DEPRESSION: {
                    POSITIVE: [1,5,9,11], // Self-realization
                    NEGATIVE: [1,2,6,8] // Hidden challenges
                },
                ANXIETY: {
                    POSITIVE: [6], // Management
                    NEGATIVE: [12] // Internal struggles
                },
                THERAPY: {
                    POSITIVE: [6, 11], // Healing through therapy
                    NEGATIVE: [8] // Emotional struggle
                },
                STRESS_MANAGEMENT: {
                    POSITIVE: [6, 12], // Success in managing stress
                    NEGATIVE: [8] // Continuous stress
                }
            }
        }
    },

    PROPERTY: {
        TRANSACTIONS: {
            BUY: {
                POSITIVE: [4, 11], // Property acquisition, gains
                NEGATIVE: [12] // Hidden losses
            },
            SELL: {
                POSITIVE: [4, 11], // Gains from property sale
                NEGATIVE: [8] // Obstacles in transaction
            },
            RENT: {
                POSITIVE: [3, 4, 11], // Gains, convenience
                NEGATIVE: [8, 12] // Struggles, hidden problems
            },
            LEASE: {
                POSITIVE: [3, 11], // Gains, convenience
                NEGATIVE: [8] // Disputes
            },
            INHERITANCE: {
                POSITIVE: [8, 11], // Gains through inheritance
                NEGATIVE: [12] // Hidden struggles
            },
            REMODELING: {
                POSITIVE: [4, 11], // Improvement, gains
                NEGATIVE: [6, 8] // Challenges, obstacles
            },
            FORECLOSURE: {
                POSITIVE: [6, 8], // Overcoming foreclosure
                NEGATIVE: [12] // Hidden losses
            }
        }
    },

    VEHICLE: {
        TRANSACTIONS: {
            BUY: {
                POSITIVE: [3, 11], // Gains, convenience
                NEGATIVE: [8, 12] // Sudden issues, hidden problems
            },
            SELL: {
                POSITIVE: [3, 11], // Gains
                NEGATIVE: [8] // Obstacles in transaction
            },
            ACCIDENT: {
                POSITIVE: [8], // Overcoming challenges
                NEGATIVE: [12] // Hidden losses
            },
            LOAN: {
                POSITIVE: [6, 11], // Gain through loan
                NEGATIVE: [12] // Hidden debts
            },
            INSURANCE: {
                POSITIVE: [11], // Gains through insurance
                NEGATIVE: [8] // Struggles
            },
            MAINTENANCE: {
                POSITIVE: [6, 11], // Gains through upkeep
                NEGATIVE: [8, 12] // Issues, neglect
            }
        }
    },

    RELATIONSHIPS: {
        MARRIAGE: {
            POSITIVE: [7, 11], // Partnership, gains
            NEGATIVE: [8, 12] // Conflicts, separation
        },
        DIVORCE: {
            POSITIVE: [8, 12], // Freedom from conflict
            NEGATIVE: [7] // Struggles in relationship
        },
        CHILD_BIRTH: {
            POSITIVE: [2,5,11], // Family growth, happiness
            NEGATIVE: [6,8,12] // Obstacles in childbirth
        },
        ADOPTION: {
            POSITIVE: [5, 11], // Family gains
            NEGATIVE: [8, 12] // Struggles, hidden obstacles
        },
        RECONCILIATION: {
            POSITIVE: [7, 11], // Resolution of conflict
            NEGATIVE: [8, 12] // Continued struggles
        },
        CONFLICT: {
            POSITIVE: [8], // Conflict leading to resolution
            NEGATIVE: [7, 12] // Continuous struggles
        },
        FAMILY_GATHERING: {
            POSITIVE: [4, 11], // Family harmony, gains
            NEGATIVE: [8, 12] // Conflicts, hidden tensions
        }
    },

    SPIRITUALITY: {
        AWAKENING: {
            POSITIVE: [12], // Spiritual growth
            NEGATIVE: [8] // Inner struggles
        },
        RETREAT: {
            POSITIVE: [12], // Spiritual growth
            NEGATIVE: [8] // Hidden obstacles
        },
        PRACTICE: {
            POSITIVE: [9, 12], // Spiritual practice
            NEGATIVE: [6, 8] // Obstacles in practice
        },
        COMMUNITY_SERVICE: {
            POSITIVE: [6, 11], // Gains through service
            NEGATIVE: [12] // Hidden struggles
        },
        MEDITATION: {
            POSITIVE: [12], // Spiritual growth
            NEGATIVE: [6, 8] // Obstacles, struggles
        }
    },

    FINANCE: {
        LOAN: {
            POSITIVE: [6, 11], // Gains through loan
            NEGATIVE: [8, 12] // Struggles, hidden debts
        },
        DEBT: {
            POSITIVE: [6], // Overcoming debt
            NEGATIVE: [8, 12] // Struggles, hidden debts
        },
        INVESTMENT: {
            POSITIVE: [2, 5, 11], // Financial gains
            NEGATIVE: [8, 12] // Losses, hidden risks
        },
        GAIN: {
            POSITIVE: [2, 11], // Financial success
            NEGATIVE: [8] // Hidden losses
        },
        LOSS: {
            POSITIVE: [8], // Learning from losses
            NEGATIVE: [12] // Hidden problems
        },
        BUDGETING: {
            POSITIVE: [2, 6, 11], // Financial management
            NEGATIVE: [12] // Hidden problems
        },
        SAVINGS: {
            POSITIVE: [2, 11], // Gains through savings
            NEGATIVE: [8] // Struggles
        },
        RETIREMENT_PLANNING: {
            POSITIVE: [2, 4, 11], // Planning for future
            NEGATIVE: [6, 8] // Obstacles, sudden changes
        }
    },

    TRAVEL: {
        TYPES: {
            SHORT: {
                POSITIVE: [3, 11], // Gains through travel
                NEGATIVE: [8, 12] // Travel issues
            },
            LONG: {
                POSITIVE: [9, 11], // Gains through long travel
                NEGATIVE: [8, 12] // Obstacles, losses
            },
            INTERNATIONAL: {
                POSITIVE: [9, 12], // Opportunities through travel
                NEGATIVE: [8] // Obstacles, hidden problems
            },
            RELOCATION: {
                POSITIVE: [3, 9], // Positive changes through relocation
                NEGATIVE: [8, 12] // Struggles, hidden problems
            },
            BUSINESS_TRAVEL: {
                POSITIVE: [3, 9, 11], // Gains through business travel
                NEGATIVE: [8, 12] // Travel issues
            },
            VACATION: {
                POSITIVE: [5, 9, 11], // Relaxation, gains
                NEGATIVE: [12] // Hidden issues
            }
        }
    },

    LITIGATION: {
        DISPUTE: {
            CIVIL: {
                POSITIVE: [6, 8, 11], // Gains through resolution
                NEGATIVE: [6,8,12] // Hidden losses
            },
            CRIMINAL: {
                POSITIVE: [6,7,8,12], // Resolution
                NEGATIVE: [5,9,11] // Hidden problems
            },
            FAMILY: {
                POSITIVE: [7, 11], // Resolution of family conflicts
                NEGATIVE: [8, 12] // Struggles, hidden problems
            },
            CONTRACT: {
                POSITIVE: [7, 11], // Gains through contract resolution
                NEGATIVE: [8, 12] // Struggles
            }
        }
    },

    BUSINESS: {
        PARTNERSHIP: {
            POSITIVE: [7, 11], // Gains through partnership
            NEGATIVE: [6, 8, 12] // Conflicts, struggles
        },
        STARTUP: {
            POSITIVE: [2, 6, 10, 11], // Gains, opportunities
            NEGATIVE: [6, 8, 12] // Obstacles, struggles
        },
        EXPANSION: {
            POSITIVE: [2, 9, 11], // Gains, growth
            NEGATIVE: [6, 8, 12] // Obstacles
        },
        ACQUISITION: {
            POSITIVE: [2, 11], // Gains
            NEGATIVE: [6, 8, 12] // Struggles
        },
        DISSOLUTION: {
            POSITIVE: [8], // Freedom from conflicts
            NEGATIVE: [6, 8, 12] // Hidden problems
        },
        FRANCHISING: {
            POSITIVE: [7, 11], // Gains through franchise
            NEGATIVE: [6, 8, 12] // Struggles
        },
        
        INVESTMENT: {
            POSITIVE: [2, 5, 11], // Gains through investment
            NEGATIVE: [6, 8, 12] // Losses, hidden risks
        }
    }
};
