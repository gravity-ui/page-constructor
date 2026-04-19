import {Card, Icon, Label, Progress, Text, ThemeProvider, User, UserLabel} from '@gravity-ui/uikit';
import {
    ArrowRight,
    CircleInfoFill,
    Display,
    Eye,
    Flask,
    Globe,
    GraduationCap,
    Grip,
    Key,
    Lock,
    Microscope,
    Person,
    Rocket,
    Shield,
    StarFill,
    TriangleExclamationFill,
    Wrench,
} from '@gravity-ui/icons';
import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator',
    component: FormGenerator,
    parameters: {
        layout: 'fullscreen',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'FormGenerator is a declarative form builder driven entirely by a JSON/YAML config (`blockConfig`). ' +
                    'You describe the shape of the form — field types, labels, options, and visibility rules — ' +
                    'and FormGenerator renders it, manages internal state, and reports changes via `onUpdate` or `onUpdateByKey`. ' +
                    '\n\n' +
                    'Supported field types: `textInput`, `textArea`, `select`, `segmentedRadioGroup`, `switch`, `colorInput`, `section`, `text`. ' +
                    'Any field can be shown or hidden conditionally using the `when` array. ' +
                    'Sections can be static (collapsible) or repeating (array mode via `index`). ' +
                    'When a hidden field had a value, it is automatically removed from content.',
            },
        },
    },
} as Meta<typeof FormGenerator>;

// ─── Interstellar prefill ────────────────────────────────────────────────────

const INTERSTELLAR_PREFILL: Content = {
    shipName: 'Endurance',
    registrationNo: 'NASA-EX-2067',
    missionLog:
        "Crew: proceed through the wormhole near Saturn. Primary targets: Miller's Planet, Mann's Planet, Edmunds' Planet. Duration: indeterminate. The gravity equation must be solved — humanity's survival depends on it. Do not return without coordinates. — Prof. Brand, NASA",
    shipClass: 'station',
    faction: 'nasa',
    hullColor: '#1a3a5c',
    aiCopilot: true,
    tarsHonesty: '100',
    tarsHumor: '75',
    tarsCharm: '0',
    tarsBulkApperception: '75',
    hyperdrive: 'class1',
    hullManufacturer: 'Lockheed Martin',
    crew: [
        {name: 'Cooper', role: 'pilot', species: 'human'},
        {name: 'Dr. Brand', role: 'medic', species: 'human'},
        {name: 'Romilly', role: 'engineer', species: 'human'},
        {name: 'TARS', role: 'captain', species: 'droid'},
    ],
    routes: [
        {from: 'Earth', to: 'Saturn Orbit', warp: 'warp1'},
        {from: 'Saturn Orbit', to: 'Wormhole', warp: 'hyperspace'},
        {from: 'Wormhole', to: "Miller's Planet", warp: 'warp2'},
    ],
};

// ─── Preview helpers ─────────────────────────────────────────────────────────

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const FACTION_THEME = {
    nasa: 'info',
    esa: 'success',
    cnsa: 'warning',
    lazarus: 'unknown',
    unknown: 'danger',
} as const;

const FACTION_LABEL: Record<string, string> = {
    nasa: 'NASA',
    esa: 'ESA',
    cnsa: 'CNSA',
    lazarus: 'Lazarus Mission',
    unknown: 'Unknown',
};

const WEAPON_LABEL: Record<string, string> = {
    lasers: 'Laser Cannons',
    ion: 'Ion Torpedoes',
    turbo: 'Turbolasers',
    thermal: 'Thermal Detonators',
};

const ROLE_ICON: Record<string, React.ReactNode> = {
    captain: <Icon data={StarFill} size={12} />,
    pilot: <Icon data={Rocket} size={12} />,
    engineer: <Icon data={Wrench} size={12} />,
    gunner: <Icon data={Shield} size={12} />,
    medic: <Icon data={Flask} size={12} />,
    smuggler: <Icon data={Key} size={12} />,
    scientist: <Icon data={Microscope} size={12} />,
};

const SPECIES_ICON: Record<string, React.ReactNode> = {
    human: <Icon data={Person} size={12} />,
    wookiee: <Icon data={GraduationCap} size={12} />,
    droid: <Icon data={Display} size={12} />,
    twilek: <Icon data={Eye} size={12} />,
};

const WARP_PROGRESS: Record<string, number> = {
    warp1: 22,
    warp2: 45,
    warp3: 68,
    jump: 85,
    hyperspace: 100,
};

const WARP_PROGRESS_THEME: Record<string, 'default' | 'info' | 'success' | 'warning' | 'danger'> = {
    warp1: 'default',
    warp2: 'info',
    warp3: 'warning',
    jump: 'warning',
    hyperspace: 'success',
};

const WARP_LABEL_THEME: Record<string, 'normal' | 'info' | 'success' | 'warning' | 'danger'> = {
    warp1: 'normal',
    warp2: 'info',
    warp3: 'warning',
    jump: 'warning',
    hyperspace: 'success',
};

// ─── Mission Brief ────────────────────────────────────────────────────────────

const MissionBrief = ({text}: {text: string}) => (
    <Card
        style={{
            padding: '16px 20px',
            borderLeft: '3px solid var(--g-color-base-brand)',
        }}
    >
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
            <span style={{color: 'var(--g-color-text-hint)', display: 'flex'}}>
                <Icon data={Lock} size={14} />
            </span>
            <Text variant="caption-2" color="hint">
                CLASSIFIED — MISSION BRIEF
            </Text>
        </div>
        <Text variant="body-2">{text}</Text>
    </Card>
);

// ─── StarshipPreview ──────────────────────────────────────────────────────────

interface CrewMember {
    name?: string;
    role?: string;
    species?: string;
}

interface Route {
    from?: string;
    to?: string;
    warp?: string;
}

const StarshipPreview = ({content}: {content: Content}) => {
    const shipName = content.shipName as string | undefined;
    const registrationNo = content.registrationNo as string | undefined;
    const shipClass = content.shipClass as string | undefined;
    const faction = content.faction as string | undefined;
    const hullColor = content.hullColor as string | undefined;
    const armed = content.armed as boolean | undefined;
    const weaponSystem = content.weaponSystem as string | undefined;
    const hyperdrive = content.hyperdrive as string | undefined;
    const aiCopilot = content.aiCopilot as boolean | undefined;
    const hullManufacturer = content.hullManufacturer as string | undefined;
    const tarsHonesty = parseInt((content.tarsHonesty as string) ?? '90', 10);
    const tarsHumor = parseInt((content.tarsHumor as string) ?? '75', 10);
    const tarsCharm = parseInt((content.tarsCharm as string) ?? '0', 10);
    const tarsBulkApperception = parseInt((content.tarsBulkApperception as string) ?? '85', 10);
    const crew = ((content.crew as CrewMember[] | undefined) ?? []).filter(Boolean);
    const routes = ((content.routes as Route[] | undefined) ?? []).filter(Boolean);

    const factionTheme = faction
        ? (FACTION_THEME[faction as keyof typeof FACTION_THEME] ?? 'normal')
        : 'normal';

    return (
        <Card style={{padding: 20, display: 'flex', flexDirection: 'column', gap: 20}}>
            {/* Header */}
            <div>
                <Text variant="header-1">{shipName || '— Unnamed Vessel —'}</Text>
                {registrationNo && (
                    <div>
                        <Text variant="caption-1" color="hint">
                            REG: {registrationNo}
                        </Text>
                    </div>
                )}
            </div>

            {/* Status badges */}
            <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                {faction && (
                    <Label theme={factionTheme} size="s">
                        {FACTION_LABEL[faction] ?? faction}
                    </Label>
                )}
                {shipClass && (
                    <Label theme="normal" size="s" icon={<Icon data={Globe} size={12} />}>
                        {capitalize(shipClass)}
                    </Label>
                )}
                <Label
                    theme={armed ? 'danger' : 'normal'}
                    size="s"
                    icon={armed ? <Icon data={TriangleExclamationFill} size={12} /> : undefined}
                >
                    {armed ? 'Armed' : 'Unarmed'}
                </Label>
                {armed && weaponSystem && (
                    <Label theme="warning" size="s">
                        {WEAPON_LABEL[weaponSystem] ?? weaponSystem}
                    </Label>
                )}
            </div>

            {/* Hull color */}
            {hullColor && (
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <div
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 3,
                            background: hullColor,
                            border: '1px solid var(--g-color-line-generic)',
                            flexShrink: 0,
                        }}
                    />
                    <Text variant="body-1" color="secondary">
                        {hullColor}
                    </Text>
                    {hullManufacturer && (
                        <Text variant="caption-1" color="hint">
                            · {hullManufacturer}
                        </Text>
                    )}
                </div>
            )}

            {/* TARS personality matrix (when AI copilot enabled) */}
            {aiCopilot && (
                <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12}}>
                        <User
                            name="TARS"
                            description="Tactical Assistance & Rescue System"
                            size="s"
                            avatar={{text: 'TA', theme: 'brand'}}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                        {[
                            {label: 'Honesty', value: tarsHonesty, theme: 'success' as const},
                            {label: 'Humor', value: tarsHumor, theme: 'info' as const},
                            {label: 'Charm', value: tarsCharm, theme: 'danger' as const},
                            {
                                label: 'Bulk Apperception',
                                value: tarsBulkApperception,
                                theme: 'info' as const,
                            },
                        ].map(({label, value, theme}) => (
                            <div key={label}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text variant="caption-1" color="secondary">
                                        {label}
                                    </Text>
                                    <Text variant="caption-1" color="hint">
                                        {value}%
                                    </Text>
                                </div>
                                <Progress value={value} theme={theme} size="xs" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!aiCopilot && hyperdrive && (
                <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4}}>
                        <span style={{color: 'var(--g-color-text-hint)', display: 'flex'}}>
                            <Icon data={Display} size={14} />
                        </span>
                        <Text variant="caption-2" color="hint">
                            SHIP SYSTEMS
                        </Text>
                    </div>
                    <Label theme="normal" size="s">
                        Hyperdrive: {capitalize(hyperdrive)}
                    </Label>
                    <Label theme="normal" size="s">
                        AI: Offline
                    </Label>
                </div>
            )}

            {/* Crew */}
            <div>
                <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10}}>
                    <span style={{color: 'var(--g-color-text-hint)', display: 'flex'}}>
                        <Icon data={Grip} size={14} />
                    </span>
                    <Text variant="caption-2" color="hint">
                        CREW MANIFEST
                    </Text>
                </div>
                {crew.length > 0 ? (
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        {crew.map((member, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <UserLabel
                                    text={member.name || '—'}
                                    type={member.species === 'droid' ? 'empty' : 'person'}
                                    size="s"
                                />
                                {member.role && (
                                    <Label theme="normal" size="s" icon={ROLE_ICON[member.role]}>
                                        {capitalize(member.role)}
                                    </Label>
                                )}
                                {member.species && (
                                    <Label
                                        theme="unknown"
                                        size="s"
                                        icon={SPECIES_ICON[member.species]}
                                    >
                                        {capitalize(member.species)}
                                    </Label>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text variant="body-1" color="hint">
                        No crew assigned
                    </Text>
                )}
            </div>

            {/* Flight routes */}
            <div>
                <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10}}>
                    <span style={{color: 'var(--g-color-text-hint)', display: 'flex'}}>
                        <Icon data={CircleInfoFill} size={14} />
                    </span>
                    <Text variant="caption-2" color="hint">
                        FLIGHT PLAN
                    </Text>
                </div>
                {routes.length > 0 ? (
                    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                        {routes.map((route, i) => {
                            const warpProgress = route.warp
                                ? (WARP_PROGRESS[route.warp] ?? 50)
                                : 50;
                            const warpProgressTheme = route.warp
                                ? (WARP_PROGRESS_THEME[route.warp] ?? 'default')
                                : 'default';
                            const warpLabelTheme = route.warp
                                ? (WARP_LABEL_THEME[route.warp] ?? 'normal')
                                : 'normal';
                            return (
                                <div key={i}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 4,
                                        }}
                                    >
                                        <Text variant="body-2">{route.from || '—'}</Text>
                                        <span
                                            style={{
                                                color: 'var(--g-color-text-hint)',
                                                display: 'flex',
                                            }}
                                        >
                                            <Icon data={ArrowRight} size={12} />
                                        </span>
                                        <Text variant="body-2">{route.to || '—'}</Text>
                                        {route.warp && (
                                            <Label theme={warpLabelTheme} size="xs">
                                                {capitalize(route.warp)}
                                            </Label>
                                        )}
                                    </div>
                                    <Progress
                                        value={warpProgress}
                                        theme={warpProgressTheme}
                                        size="xs"
                                        text={`${warpProgress}% drive capacity`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Text variant="body-1" color="hint">
                        No routes logged
                    </Text>
                )}
            </div>
        </Card>
    );
};

// ─── Template ─────────────────────────────────────────────────────────────────

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>(INTERSTELLAR_PREFILL);
    const missionLog = content.missionLog as string | undefined;

    return (
        <ThemeProvider theme="dark">
            <div
                style={{
                    padding: 24,
                    minHeight: '100vh',
                    background: 'var(--g-color-base-background)',
                    boxSizing: 'border-box',
                }}
            >
                <div style={{display: 'flex', gap: 24}}>
                    <div
                        style={{
                            flex: 1,
                            minWidth: 280,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                            position: 'sticky',
                            top: 24,
                            alignSelf: 'flex-start',
                        }}
                    >
                        {missionLog && <MissionBrief text={missionLog} />}
                        <StarshipPreview content={content} />
                    </div>
                    <div style={{width: 530, flexShrink: 0}}>
                        <Card style={{overflow: 'hidden'}}>
                            <div
                                style={{
                                    padding: '8px 16px',
                                    borderBottom: '1px solid var(--g-color-line-generic)',
                                }}
                            >
                                <Text variant="caption-1" color="hint">
                                    GALACTIC REGISTRY — TERMINAL v4.2
                                </Text>
                            </div>
                            <FormGenerator
                                blockConfig={blockConfig}
                                contentConfig={content}
                                onUpdate={setContent}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Overview = Template.bind({});
Overview.args = {
    blockConfig: [
        {
            type: 'text',
            level: 'info',
            text: 'Authorized personnel only. Unauthorized access will trigger Lazarus Protocol.',
        },
        {
            type: 'textInput',
            name: 'shipName',
            title: 'Ship Name',
        },
        {
            type: 'textInput',
            name: 'registrationNo',
            title: 'Registration No.',
        },
        {
            type: 'textArea',
            name: 'missionLog',
            title: 'Mission Log',
        },
        {
            type: 'segmentedRadioGroup',
            name: 'shipClass',
            title: 'Ship Class',
            options: [
                {value: 'ranger', content: 'Ranger'},
                {value: 'lander', content: 'Lander'},
                {value: 'station', content: 'Station'},
                {value: 'probe', content: 'Probe'},
            ],
        },
        {
            type: 'select',
            name: 'faction',
            title: 'Affiliation',
            hasClear: true,
            options: [
                {value: 'nasa', content: 'NASA'},
                {value: 'esa', content: 'ESA'},
                {value: 'cnsa', content: 'CNSA'},
                {value: 'lazarus', content: 'Lazarus Mission'},
                {value: 'unknown', content: 'Unknown'},
            ],
        },
        {
            type: 'colorInput',
            name: 'hullColor',
            title: 'Hull Color',
        },
        {
            type: 'switch',
            name: 'armed',
            title: 'Armed',
        },
        {
            type: 'select',
            name: 'weaponSystem',
            title: 'Weapon System',
            when: [{field: 'armed', operator: '===', value: true}],
            options: [
                {value: 'lasers', content: 'Laser Cannons'},
                {value: 'ion', content: 'Ion Torpedoes'},
                {value: 'turbo', content: 'Turbolasers'},
                {value: 'thermal', content: 'Thermal Detonators'},
            ],
        },
        {
            type: 'text',
            level: 'danger',
            text: 'Armed Probe detected. Galactic Senate has been notified.',
            when: [
                {field: 'armed', operator: '===', value: true},
                {operator: '&&'},
                {field: 'shipClass', operator: '===', value: 'probe'},
            ],
        },
        {
            type: 'section',
            title: 'Ship Systems',
            opened: true,
            fields: [
                {
                    type: 'text',
                    text: 'Internal systems configuration.',
                    color: 'secondary',
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'hyperdrive',
                    title: 'Hyperdrive Class',
                    options: [
                        {value: 'class1', content: 'Class 1'},
                        {value: 'class2', content: 'Class 2'},
                        {value: 'none', content: 'None'},
                    ],
                },
                {
                    type: 'switch',
                    name: 'aiCopilot',
                    title: 'AI Copilot (TARS)',
                },
                {
                    type: 'textInput',
                    name: 'hullManufacturer',
                    title: 'Hull Manufacturer',
                },
            ],
        },
        {
            type: 'section',
            title: 'TARS Personality Matrix',
            opened: true,
            when: [{field: 'aiCopilot', operator: '===', value: true}],
            fields: [
                {
                    type: 'text',
                    text: 'Adjust TARS personality parameters. Setting Honesty below 50% is not recommended.',
                    color: 'secondary',
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'tarsHonesty',
                    title: 'Honesty',
                    options: [
                        {value: '0', content: '0%'},
                        {value: '25', content: '25%'},
                        {value: '50', content: '50%'},
                        {value: '75', content: '75%'},
                        {value: '100', content: '100%'},
                    ],
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'tarsHumor',
                    title: 'Humor',
                    options: [
                        {value: '0', content: '0%'},
                        {value: '25', content: '25%'},
                        {value: '50', content: '50%'},
                        {value: '75', content: '75%'},
                        {value: '100', content: '100%'},
                    ],
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'tarsCharm',
                    title: 'Charm',
                    options: [
                        {value: '0', content: '0%'},
                        {value: '25', content: '25%'},
                        {value: '50', content: '50%'},
                        {value: '75', content: '75%'},
                        {value: '100', content: '100%'},
                    ],
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'tarsBulkApperception',
                    title: 'Bulk Apperception',
                    options: [
                        {value: '0', content: '0%'},
                        {value: '25', content: '25%'},
                        {value: '50', content: '50%'},
                        {value: '75', content: '75%'},
                        {value: '100', content: '100%'},
                    ],
                },
            ],
        },
        {
            type: 'section',
            title: 'Crew Members',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Crew Member {{index}}',
            itemView: 'card',
            fields: [
                {
                    type: 'textInput',
                    name: 'crew[{{index}}].name',
                    title: 'Name',
                },
                {
                    type: 'select',
                    name: 'crew[{{index}}].role',
                    title: 'Role',
                    options: [
                        {value: 'captain', content: 'Captain'},
                        {value: 'pilot', content: 'Pilot'},
                        {value: 'engineer', content: 'Engineer'},
                        {value: 'gunner', content: 'Gunner'},
                        {value: 'medic', content: 'Medic'},
                        {value: 'smuggler', content: 'Smuggler'},
                    ],
                },
                {
                    type: 'segmentedRadioGroup',
                    name: 'crew[{{index}}].species',
                    title: 'Species',
                    options: [
                        {value: 'human', content: 'Human'},
                        {value: 'wookiee', content: 'Wookiee'},
                        {value: 'droid', content: 'Droid'},
                        {value: 'twilek', content: "Twi'lek"},
                    ],
                },
            ],
        },
        {
            type: 'section',
            title: 'Flight Routes',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Route {{index}}',
            itemView: 'clear',
            fields: [
                {
                    type: 'textInput',
                    name: 'routes[{{index}}].from',
                    title: 'From',
                },
                {
                    type: 'textInput',
                    name: 'routes[{{index}}].to',
                    title: 'To',
                },
                {
                    type: 'select',
                    name: 'routes[{{index}}].warp',
                    title: 'Warp Class',
                    options: [
                        {value: 'warp1', content: 'Warp 1'},
                        {value: 'warp2', content: 'Warp 2'},
                        {value: 'warp3', content: 'Warp 3'},
                        {value: 'jump', content: 'Jump'},
                        {value: 'hyperspace', content: 'Hyperspace'},
                    ],
                },
            ],
        },
    ] as Fields,
};
