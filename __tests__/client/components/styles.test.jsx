/* eslint-disable react/jsx-key */
import React from "react";
import { mount } from "enzyme";

import breakpoints from "components/styles/breakpoints";
import {
	Box,
	Container,
	Paragraph,
	TableAction,
	Status
} from "components/styles";

describe("Styles", () => {
	[
		[
			"Box: grey scheme applied",
			<Box grey />,
			[
				["background-color", "#e8e8e8"],
				["border-color", "#c3c3c3"],
				["border-color", "#e0e0e0", { modifier: "hr" }]
			]
		],
		[
			"Container: small styles applied",
			<Container small />,
			[
				["max-width", "540px"],
				["max-width", "700px", { media: `(min-width: ${breakpoints.m})` }]
			]
		],
		[
			"Container: table cell applied",
			<Container tableCell />,
			[["display", "table-cell"]]
		],
		[
			"Container: inactive styles applied",
			<Container inactive />,
			[
				["opacity", "0.3"],
				["pointer-events", "none"],
				["opacity", "1", { media: `(min-width: ${breakpoints.m})` }],
				["pointer-events", "auto", { media: `(min-width: ${breakpoints.m})` }]
			]
		],
		[
			"Paragraph: light styles applied",
			<Paragraph light />,
			[
				["color", "#cccccc"],
				["font-size", "10pt"],
				["line-height", "1.4"]
			]
		],
		[
			"Paragraph: center align applied",
			<Paragraph center />,
			[["text-align", "center"]]
		],
		[
			"TableAction: disabled styles applied",
			<TableAction disabled />,
			[["color", "#bbd7f5"]]
		],
		[
			"Status: success styles applied",
			<Status success />,
			[["background-color", "#18c96e", { modifier: ":before" }]]
		]
	].map(([scenario, component, rules]) =>
		it(scenario, () => {
			const subject = mount(component);
			rules.forEach(([property, value, options]) =>
				expect(subject).toHaveStyleRule(property, value, options)
			);
		})
	);
});
