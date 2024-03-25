import React, { useEffect, useState } from "react";
import data from "../../data.json";

const TaskList = ({ dataObject }): React.JSX.Element => {
	const listItem = dataObject.map(
		(course: { id: number; name: string; price: string }) => (
			<li key={course.id}>
				<p>
					<span>
						{course.name} {course.price}
					</span>
				</p>
			</li>
		)
	);

	return (
		<div>
			<ul>{listItem}</ul>
		</div>
	);
};

export default TaskList;
